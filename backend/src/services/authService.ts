import axios from "axios";
import { AUTH_CONFIG } from "../config/appConfig";

// Types
interface AuthResponse {
   token_type: string;
   access_token: string;
   expires_in: number;
}

// Cache for auth token
let cachedToken: AuthResponse | null = null;
let tokenExpiration: number = 0;

/**
 * Get authentication token from the API
 * This function will cache the token and return it if it's still valid
 */
export const getAuthToken = async (): Promise<AuthResponse> => {
   const currentTime = Math.floor(Date.now() / 1000);

   // Return cached token if it's still valid (with 5 minute buffer)
   if (cachedToken && tokenExpiration > currentTime + 300) {
      return cachedToken;
   }

   try {
      // Instead of making an API call, use the token from config
      // This simplifies our implementation and ensures we use the provided token
      const authData: AuthResponse = {
         token_type: AUTH_CONFIG.TOKEN.token_type,
         access_token: AUTH_CONFIG.TOKEN.access_token,
         expires_in: AUTH_CONFIG.TOKEN.expires_in,
      };

      // Cache the token
      cachedToken = authData;
      tokenExpiration = currentTime + authData.expires_in;

      return authData;
   } catch (error) {
      console.error("Failed to authenticate with the API:", error);
      throw new Error("Authentication failed");
   }
};

/**
 * Create an authenticated axios instance for making API requests
 */
export const createAuthenticatedClient = async () => {
   try {
      const auth = await getAuthToken();

      const client = axios.create({
         baseURL: AUTH_CONFIG.API_URL,
         headers: {
            Authorization: `${auth.token_type} ${auth.access_token}`,
            "Content-Type": "application/json",
         },
         timeout: 15000, // Using hardcoded value instead of AUTH_CONFIG.API_TIMEOUT
      });

      // Add response interceptor to handle common errors
      client.interceptors.response.use(
         (response) => response,
         async (error) => {
            const originalRequest = error.config;

            // If error was due to token expiry and we haven't already tried to refresh
            if (error.response?.status === 401 && !originalRequest._retry) {
               originalRequest._retry = true;

               try {
                  // Force token refresh by invalidating cache
                  tokenExpiration = 0;
                  const newAuth = await getAuthToken();

                  // Update the authorization header
                  originalRequest.headers.Authorization = `${newAuth.token_type} ${newAuth.access_token}`;

                  // Retry the request
                  return axios(originalRequest);
               } catch (refreshError) {
                  return Promise.reject(refreshError);
               }
            }

            // Implement retry logic for network errors or 5xx errors
            if (
               (error.code === "ECONNABORTED" ||
                  error.code === "ERR_NETWORK" ||
                  (error.response && error.response.status >= 500)) &&
               !originalRequest._retryCount
            ) {
               // Initialize retry count
               originalRequest._retryCount = 1;

               // Create a retry function with exponential backoff
               const retry = async (attempt: number): Promise<any> => {
                  if (attempt > 3) {
                     // Using hardcoded value instead of AUTH_CONFIG.API_RETRY_ATTEMPTS
                     return Promise.reject(error);
                  }

                  // Wait with exponential backoff
                  const delay = 1000 * Math.pow(2, attempt - 1); // Using hardcoded value instead of AUTH_CONFIG.API_RETRY_DELAY
                  await new Promise((resolve) => setTimeout(resolve, delay));

                  console.log(
                     `Retrying request (attempt ${attempt}/3)...` // Using hardcoded value for retry attempts
                  );

                  try {
                     // Make the request again
                     return await axios(originalRequest);
                  } catch (retryError) {
                     // Update retry count
                     originalRequest._retryCount = attempt + 1;
                     // Try again
                     return retry(attempt + 1);
                  }
               };

               // Start the retry process
               return retry(1);
            }

            return Promise.reject(error);
         }
      );

      return client;
   } catch (error) {
      console.error("Error creating authenticated client:", error);
      throw new Error("Failed to create API client");
   }
};

export default {
   getAuthToken,
   createAuthenticatedClient,
};
