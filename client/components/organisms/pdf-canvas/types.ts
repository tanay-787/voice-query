import type { StyleProp, ViewStyle } from "react-native";

export interface PdfCanvasRef {
  /**
   * Programmatically navigate to a specific page number (1-indexed).
   */
  setPage: (pageNumber: number) => void;
  /**
   * Retrieve the current active page number (1-indexed).
   */
  getPage: () => number;
}

export interface PdfCanvasProps {
  /**
   * Source URI of the PDF (local file:// URI or remote http/https URL).
   */
  sourceUri: string;
  /**
   * Optional initial page to display on load (defaults to 1).
   */
  initialPage?: number;
  /**
   * Fit policy: 0 = fit width (default for document reading), 1 = fit height, 2 = fit both.
   */
  fitPolicy?: 0 | 1 | 2;
  /**
   * Gap spacing between pages in logical pixels. Defaults to 12.
   */
  spacing?: number;
  /**
   * Single page paging (snap page-by-page) vs continuous vertical scrolling. Defaults to false (continuous).
   */
  enablePaging?: boolean;
  /**
   * Callback fired whenever the active page changes during scrolling or navigation.
   */
  onPageChange?: (page: number, totalPages: number) => void;
  /**
   * Callback fired when the document finishes loading and metadata is ready.
   */
  onLoadComplete?: (totalPages: number) => void;
  /**
   * Callback fired if reading or rendering the PDF encounters a failure.
   */
  onError?: (error: Error) => void;
  /**
   * Callback fired when the canvas zoom scale changes.
   */
  onScaleChange?: (scale: number) => void;
  /**
   * Optional style overrides for the canvas container.
   */
  style?: StyleProp<ViewStyle>;
}
