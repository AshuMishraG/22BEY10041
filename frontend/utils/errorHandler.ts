import { AxiosError } from "axios";
import axios from "axios";

interface ApiError {
   message: string;
   code: string;
   status: number;
   details?: string;
}

export const processApiError = (error: unknown): ApiError => {
   // Handle Axios errors (network or API errors)
   if (error instanceof AxiosError) {
      // Handle backend detailed error responses
      if (error.response?.data?.error) {
         return {
            message:
               error.response.data.error ||
               "An error occurred with the API request",
            code: error.response.data.code || error.code || "UNKNOWN_ERROR",
            status: error.response.status || 500,
            details:
               typeof error.response.data.details === "string"
                  ? error.response.data.details
                  : JSON.stringify(error.response.data.details || {}),
         };
      }

      if (error.code === "ERR_NETWORK") {
         return {
            message:
               "Cannot connect to the server. Please check your connection or try again later.",
            code: error.code,
            status: 500,
            details: error.message,
         };
      }

      return {
         message:
            error.response?.data?.message ||
            error.message ||
            "An error occurred with the API request",
         code: error.code || "UNKNOWN_ERROR",
         status: error.response?.status || 500,
         details: JSON.stringify(error.response?.data || {}),
      };
   }

   // Handle standard JavaScript errors
   if (error instanceof Error) {
      return {
         message: error.message || "An unexpected error occurred",
         code: "UNKNOWN_ERROR",
         status: 500,
         details: error.stack,
      };
   }

   // Handle unknown error types
   return {
      message: "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
      status: 500,
      details:
         typeof error === "object" ? JSON.stringify(error) : String(error),
   };
};

/**
 * Handles error logging consistently across the application
 */
export function logError(context: string, error: unknown): void {
   if (axios.isAxiosError(error)) {
      if (error.response) {
         console.error(
            `[${context}] API Error (${error.response.status}):`,
            error.response.data || error.message
         );
      } else if (error.request) {
         console.error(`[${context}] No response received:`, error.message);
      } else {
         console.error(`[${context}] Request error:`, error.message);
      }
   } else if (error instanceof Error) {
      console.error(`[${context}] Error:`, error);
   } else {
      console.error(`[${context}] Unknown error:`, error);
   }
}

/**
 * Converts API errors into user-friendly messages
 */
export function getFriendlyErrorMessage(error: unknown): string {
   if (axios.isAxiosError(error)) {
      // Network errors
      if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
         return "Cannot connect to the server. Please check your connection and make sure the backend is running.";
      }

      // Server response errors
      if (error.response) {
         // Get error details from response if available
         const serverErrorMessage =
            error.response.data?.error || error.response.data?.message;

         if (error.response.status === 401 || error.response.status === 403) {
            return "Authentication error. Please try again.";
         }

         if (error.response.status === 404) {
            return "The requested resource was not found.";
         }

         // Include specific error message from backend if available
         if (serverErrorMessage) {
            return serverErrorMessage;
         }

         return `Request failed with status code ${error.response.status}. Please try again.`;
      }

      // The request was made but no response was received
      if (error.request) {
         return "No response from server. Please check if the backend server is running.";
      }
   }

   // For non-Axios errors
   if (error instanceof Error) {
      return error.message;
   }

   // For unknown errors
   return "An unexpected error occurred. Please try again.";
}
