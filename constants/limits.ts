/**
 * Hard limits for v1 as per specification
 * These constraints are strictly enforced
 */

export const LIMITS = {
  // PDF constraints
  PDF_MAX_FILE_SIZE_BYTES: 2 * 1024 * 1024, // 2MB
  PDF_MAX_FILE_SIZE_MB: 2,

  // URL constraints
  URL_MAX_CHARS: 15_000,

  // Response validation (failsafe)
  SUMMARY_MAX_CHARS: 50_000,

  // Audio constraints
  AUDIO_MAX_DURATION_MS: 60_000, // 60 seconds max recording
} as const;

export const ERROR_MESSAGES = {
  PDF_TOO_LARGE: `This PDF is too large for v1. Please upload a smaller document (max ${LIMITS.PDF_MAX_FILE_SIZE_MB}MB).`,
  URL_TOO_LARGE: "This webpage is too large or complex for v1.",
  PDF_UPLOAD_FAILED: "Could not process this PDF. Please try again.",
  URL_INVALID: "Please enter a valid URL.",
  NETWORK_ERROR: "Could not fetch the webpage. Check your connection.",
  NO_CONTEXT: "No document loaded. Please upload a PDF or URL first.",
  AUDIO_TOO_LONG: "Recording too long. Please keep it under 60 seconds.",
  SUMMARY_FAILED: "Could not generate summary. Please try again.",
  ANSWER_NOT_FOUND: "I don't see that in this document.",
} as const;
