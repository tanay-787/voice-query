import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Pdf, { type PdfRef } from "react-native-pdf";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/context/theme-context";
import type { PdfCanvasProps, PdfCanvasRef } from "./types";

export type { PdfCanvasProps, PdfCanvasRef };

export const PdfCanvas = forwardRef<PdfCanvasRef, PdfCanvasProps>(
  (
    {
      sourceUri,
      initialPage = 1,
      fitPolicy = 0,
      spacing = 12,
      enablePaging = false,
      onPageChange,
      onLoadComplete,
      onError,
      onScaleChange,
      style,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const pdfRef = useRef<PdfRef>(null);

    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [loadError, setLoadError] = useState<Error | null>(null);

    // Forward imperative control
    useImperativeHandle(
      ref,
      () => ({
        setPage: (pageNumber: number) => {
          pdfRef.current?.setPage(pageNumber);
        },
        getPage: () => currentPage,
      }),
      [currentPage]
    );

    const handleLoadComplete = useCallback(
      (numberOfPages: number) => {
        setLoadError(null);
        onLoadComplete?.(numberOfPages);
      },
      [onLoadComplete]
    );

    const handlePageChanged = useCallback(
      (page: number, numberOfPages: number) => {
        setCurrentPage(page);
        onPageChange?.(page, numberOfPages);
      },
      [onPageChange]
    );

    const handleError = useCallback(
      (error: Error) => {
        setLoadError(error);
        onError?.(error);
      },
      [onError]
    );

    const renderActivityIndicator = useCallback(
      (progress: number) => (
        <View style={[styles.centered, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color={theme.actionPrimary} />
          {progress > 0 && progress < 1 ? (
            <Text style={[styles.progressText, { color: theme.textSecondary }]}>
              {Math.round(progress * 100)}%
            </Text>
          ) : null}
        </View>
      ),
      [theme.background, theme.actionPrimary, theme.textSecondary]
    );

    if (loadError) {
      return (
        <View
          style={[
            styles.container,
            styles.centered,
            { backgroundColor: theme.background },
            style,
          ]}
        >
          <Feather name="alert-circle" size={32} color={theme.destructive} />
          <Text style={[styles.errorTitle, { color: theme.textPrimary }]}>
            Unable to render PDF
          </Text>
          <Text style={[styles.errorDetail, { color: theme.textSecondary }]}>
            {loadError.message || "An unexpected error occurred while loading."}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.background },
          style,
        ]}
      >
        <Pdf
          ref={pdfRef}
          source={{ uri: sourceUri, cache: true }}
          page={initialPage}
          fitPolicy={fitPolicy}
          spacing={spacing}
          enablePaging={enablePaging}
          showsVerticalScrollIndicator
          onLoadComplete={handleLoadComplete}
          onPageChanged={handlePageChanged}
          onError={handleError}
          onScaleChanged={onScaleChange}
          renderActivityIndicator={renderActivityIndicator}
          style={[styles.pdf, { backgroundColor: theme.background }]}
        />
      </View>
    );
  }
);

PdfCanvas.displayName = "PdfCanvas";

export default PdfCanvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    zIndex: 2,
  },
  progressText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
  },
  errorTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  errorDetail: {
    marginTop: 6,
    fontSize: 13,
    textAlign: "center",
    maxWidth: 280,
  },
});
