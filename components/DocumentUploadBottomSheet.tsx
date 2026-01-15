/**
 * DocumentUploadBottomSheet Component
 * BottomSheet with vertically stacked PDF upload and URL input
 * Implements proper keyboard handling for TextField.Input as per HeroUI Native best practices
 */

import type {
  DocumentContextContract,
  DocumentProcessorContract,
} from '@/lib/types/ui-contracts';
import { Ionicons } from '@expo/vector-icons';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import * as DocumentPicker from 'expo-document-picker';
import {
  BottomSheet,
  Button,
  Card,
  Divider,
  ErrorView,
  Spinner,
  TextField,
} from 'heroui-native';
import React, { useCallback, useRef, useState } from 'react';
import { findNodeHandle, Text, TextInput, View, type BlurEvent, type FocusEvent } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const StyledText = withUniwind(Text);
const StyledIonicons = withUniwind(Ionicons);
const AnimatedView = withUniwind(Animated.View);

/**
 * URLTextField Component
 * TextField.Input with custom keyboard handling for BottomSheet
 * Must be rendered inside BottomSheet.Content to use useBottomSheetInternal
 */
interface URLTextFieldProps {
  url: string;
  onChangeText: (text: string) => void;
  isDisabled: boolean;
  hasError: boolean;
  errorMessage?: string;
}

function URLTextField({ url, onChangeText, isDisabled, hasError, errorMessage }: URLTextFieldProps) {
  const inputRef = useRef<TextInput>(null);
  const { animatedKeyboardState, textInputNodesRef } = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (e: FocusEvent) => {
      animatedKeyboardState.set((state) => ({
        ...state,
        target: e.nativeEvent.target,
      }));
    },
    [animatedKeyboardState]
  );

  const handleOnBlur = useCallback(
    (e: BlurEvent) => {
      const keyboardState = animatedKeyboardState.get();
      const currentFocusedInput = findNodeHandle(
        TextInput.State.currentlyFocusedInput() as TextInput | null
      );
      const shouldRemoveCurrentTarget =
        keyboardState.target === e.nativeEvent.target;
      const shouldIgnoreBlurEvent =
        currentFocusedInput &&
        textInputNodesRef.current.has(currentFocusedInput);

      if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
        animatedKeyboardState.set((state) => ({
          ...state,
          target: undefined,
        }));
      }
    },
    [animatedKeyboardState, textInputNodesRef]
  );

  return (
    <TextField isInvalid={hasError}>
      <TextField.Label>Web Page URL</TextField.Label>
      <View className="w-full flex-row items-center">
        <TextField.Input
          ref={inputRef}
          className="flex-1 pl-[60px]"
          placeholder="example.com"
          value={url}
          onChangeText={onChangeText}
          keyboardType="url"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isDisabled}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <StyledText className="absolute left-4 text-muted" pointerEvents="none">
          https://
        </StyledText>
      </View>
      {hasError && errorMessage && (
        <TextField.ErrorMessage>
          {errorMessage}
        </TextField.ErrorMessage>
      )}
    </TextField>
  );
}

interface DocumentUploadBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  documentProcessor: DocumentProcessorContract;
  documentContext: DocumentContextContract;
}
    
export function DocumentUploadBottomSheet({
  isOpen,
  onOpenChange,
  documentProcessor,
  documentContext,
}: DocumentUploadBottomSheetProps) {
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  // Validate URL format - now expects input WITHOUT https://
  const isValidUrl = (urlString: string): boolean => {
    try {
      // Prepend https:// before validation
      const fullUrl = `https://${urlString}`;
      const url = new URL(fullUrl);
      return url.protocol === 'https:' && urlString.trim().length > 0;
    } catch {
      return false;
    }
  };

  // Determine which input is active
  const hasValidUrl = url.trim() && isValidUrl(url.trim());
  const hasSelectedFile = selectedFile !== null;
  const hasValidInput = hasValidUrl || hasSelectedFile;
  
  // For animations - trigger as soon as user starts typing or selects file
  const isTypingUrl = url.trim().length > 0;
  const shouldShowPdfSection = !isTypingUrl;
  const shouldShowUrlSection = !hasSelectedFile;

  // Handle PDF file picker
  const handlePickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        setSelectedFile(result.assets[0]);
        // Clear URL when file is selected
        setUrl('');
      }
    } catch (error) {
      console.error('PDF picker error:', error);
    }
  };

  // Clear selected file
  const handleClearFile = () => {
    setSelectedFile(null);
  };

  // Handle URL change
  const handleUrlChange = (text: string) => {
    setUrl(text);
    // Clear file when URL is entered
    if (text.trim() && selectedFile) {
      setSelectedFile(null);
    }
  };

  // Handle unified processing
  const handleProcess = async () => {
    if (!hasValidInput || documentProcessor.isProcessing) return;

    try {
      if (selectedFile) {
        // Process PDF
        const pickerResult: DocumentPicker.DocumentPickerResult = {
          canceled: false,
          assets: [selectedFile],
        };
        const processResult = await documentProcessor.processPDF(pickerResult);
        await documentContext.save(processResult.contextInput);
      } else if (hasValidUrl) {
        // Process URL
        const result = await documentProcessor.processURL(url);
        await documentContext.save(result.contextInput);
      }

      // Reset and close on success
      setUrl('');
      setSelectedFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Processing error:', error);
    }
  };

  // Reset state when BottomSheet closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setUrl('');
      setSelectedFile(null);
    }
    onOpenChange(open);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={handleOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content keyboardBehavior="extend">
          <View className="mb-6">
            <BottomSheet.Title className="text-2xl font-bold">
              Provide Context
            </BottomSheet.Title>
            <BottomSheet.Description>
              Choose a PDF file or enter a URL to get started
            </BottomSheet.Description>
          </View>

          <View className="gap-6">
            {/* PDF Upload Section - Animated */}
            {shouldShowPdfSection && (
              <AnimatedView
                className="gap-3"
                entering={FadeInDown.duration(300).springify()}
                exiting={FadeOutUp.duration(200)}
                layout={LinearTransition.springify()}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  onPress={handlePickPDF}
                  isDisabled={documentProcessor.isProcessing}
                >
                  <StyledIonicons
                    name="document-outline"
                    size={20}
                    className="text-secondary-foreground mr-2"
                  />
                  <Button.Label>Choose PDF File</Button.Label>
                </Button>

                {/* Show selected file */}
                {selectedFile && (
                  <Card variant="secondary">
                    <Card.Body className="flex-row items-center justify-between p-3">
                      <View className="flex-row items-center gap-2 flex-1">
                        <StyledIonicons
                          name="document-text"
                          size={20}
                          className="text-secondary-foreground"
                        />
                        <StyledText className="text-sm flex-1" numberOfLines={1}>
                          {selectedFile.name}
                        </StyledText>
                      </View>
                      <Button
                        variant="ghost"
                        size="sm"
                        onPress={handleClearFile}
                        isDisabled={documentProcessor.isProcessing}
                      >
                        <StyledIonicons
                          name="close-circle"
                          size={20}
                          className="text-muted"
                        />
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </AnimatedView>
            )}

            {/* Divider: -OR- - Only show when both sections visible */}
            {!isTypingUrl && !hasSelectedFile && (
              <AnimatedView
                className="flex-row items-center gap-4"
                entering={FadeInDown.duration(300).springify()}
                exiting={FadeOutUp.duration(200)}
                layout={LinearTransition.springify()}
              >
                <Divider className="flex-1" />
                <StyledText className="text-sm text-muted font-medium">OR</StyledText>
                <Divider className="flex-1" />
              </AnimatedView>
            )}

            {/* URL Input Section - Animated */}
            {shouldShowUrlSection && (
              <AnimatedView
                className="gap-3"
                entering={FadeInDown.duration(300).springify()}
                exiting={FadeOutUp.duration(200)}
                layout={LinearTransition.springify()}
              >
                <URLTextField
                  url={url}
                  onChangeText={handleUrlChange}
                  isDisabled={documentProcessor.isProcessing}
                  hasError={!!documentProcessor.error}
                  errorMessage={documentProcessor.error?.message}
                />
              </AnimatedView>
            )}

            {/* Error Display for PDF */}
            {documentProcessor.error && selectedFile && (
              <ErrorView isInvalid>{documentProcessor.error.message}</ErrorView>
            )}

            {/* Single CTA Button */}
            <Button
              variant="primary"
              size="lg"
              onPress={handleProcess}
              isDisabled={!hasValidInput || documentProcessor.isProcessing}
            >
              <Button.Label>
                {documentProcessor.isProcessing ? 'Processing...' : 'Process'}
              </Button.Label>
            </Button>

            {/* Processing Indicator */}
            {documentProcessor.isProcessing && (
              <Card variant="secondary">
                <Card.Body className="items-center p-6 gap-3">
                  <Spinner size="lg">
                    <Spinner.Indicator />
                  </Spinner>
                  <StyledText className="text-sm text-muted">
                    Processing document...
                  </StyledText>
                </Card.Body>
              </Card>
            )}
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
