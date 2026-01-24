/**
 * DocumentUploadBottomSheet Component
 * BottomSheet with vertically stacked PDF upload and URL input
 * Implements proper keyboard handling for TextField.Input as per HeroUI Native best practices
 * 
 * @param documentProcessor - Document processor from useDocumentProcessor hook (type inferred)
 * @param documentContext - Document context from useDocumentContext hook (type inferred)
 */

import type { useDocumentContext } from '@/lib/hooks/useDocumentContext';
import type { useDocumentProcessor } from '@/lib/hooks/useDocumentProcessor';
import { ErrorType, useErrorHandler } from '@/lib/hooks/useErrorHandler';
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
import { ThemedIcon } from './ThemedIcon';

const StyledText = withUniwind(Text);
const AnimatedView = withUniwind(Animated.View);

/**
 * URLTextField Component
 * TextField.Input with custom keyboard handling for BottomSheet
 * Must be rendered inside BottomSheet.Content to use useBottomSheetInternal
 * 
 * Implements the pattern from HeroUI Native docs for TextField with prefix text.
 * Uses absolute positioning for the "https://" prefix.
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
  
  // Keyboard handling hooks from @gorhom/bottom-sheet
  // These communicate focus state to the BottomSheet for proper keyboard avoidance
  const { animatedKeyboardState, textInputNodesRef } = useBottomSheetInternal();

  const handleOnFocus = useCallback(
    (e: FocusEvent) => {
      // Notify BottomSheet that this input is focused
      // This allows the sheet to extend properly when keyboard appears
      animatedKeyboardState.set((state) => ({
        ...state,
        target: e.nativeEvent.target,
      }));
    },
    [animatedKeyboardState]
  );

  const handleOnBlur = useCallback(
    (e: BlurEvent) => {
      // Notify BottomSheet that focus is lost
      // Check if another input in the sheet is being focused before clearing
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
  // Type inferred from hook return types - follows pattern from test.tsx and audio-test.tsx
  documentProcessor: ReturnType<typeof useDocumentProcessor>;
  documentContext: ReturnType<typeof useDocumentContext>;
}
    
export function DocumentUploadBottomSheet({
  isOpen,
  onOpenChange,
  documentProcessor,
  documentContext,
}: DocumentUploadBottomSheetProps) {
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const { showError, showSuccess } = useErrorHandler();


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
      showError(ErrorType.DOCUMENT_UPLOAD_FAILED, error);
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
        showSuccess('Document Processed', 'PDF has been successfully analyzed');
      } else if (hasValidUrl) {
        // Process URL
        const result = await documentProcessor.processURL(url);
        await documentContext.save(result.contextInput);
        showSuccess('Document Processed', 'URL content has been successfully analyzed');
      }

      // Reset and close on success
      setUrl('');
      setSelectedFile(null);
      onOpenChange(false);
    } catch (error) {
      showError(
        ErrorType.DOCUMENT_PROCESSING_FAILED,
        error,
        () => handleProcess() // Retry callback
      );
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
                  <Button.Label>Choose a File</Button.Label>
                </Button>

                {/* Show selected file */}
                {selectedFile && (
                  <Card variant="secondary">
                    <Card.Title className='text-muted text-base pl-2'>Selected File:</Card.Title>
                    <Card.Body className="flex-row items-center justify-between p-2">
                      <View className="flex-row items-center gap-2 flex-1">
                        <ThemedIcon name="document-text" size={20} themeColor="accent-soft-foreground" />
                        <StyledText className="text-sm flex-1 text-foreground" numberOfLines={1}>
                          {selectedFile.name}
                        </StyledText>
                      </View>
                      <Button
                        variant="ghost"
                        isIconOnly
                        onPress={handleClearFile}
                        isDisabled={documentProcessor.isProcessing}
                      >
                        <ThemedIcon name="close-circle" size={20} themeColor="muted" />
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
              {documentProcessor.isProcessing ?(
                <Spinner size="lg">
                  <Spinner.Indicator />
                </Spinner>
              ) : null }
              <Button.Label>
                {documentProcessor.isProcessing ? 'Retrieving Context...' : 'Proceed to Chat'}
              </Button.Label>
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
