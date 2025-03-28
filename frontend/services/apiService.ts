import axios, { AxiosRequestConfig } from "axios";
import { APP_CONFIG, API_CONFIG } from "@/config/appConfig";
import { logError } from "@/utils/errorHandler";

// Type definitions
export interface User {
   id: number;
   username: string;
   fullName: string;
   email: string;
   profileImage: string;
   postCount: number;
}

export interface Post {
   id: number;
   userId: number;
   title: string;
   content: string;
   image: string;
   commentCount: number;
   likeCount: number;
   createdAt: string;
   user?: User;
}

export interface Comment {
   id: number;
   postId: number;
   userId: number;
   content: string;
   createdAt: string;
   user?: User;
}

export interface AuthToken {
   token_type: string;
   access_token: string;
   expires_in: number;
}

// Create axios instance with base URL and authentication
const api = axios.create({
   baseURL: API_CONFIG.BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
   timeout: APP_CONFIG.API_TIMEOUT,
   withCredentials: false, // Disable sending cookies with requests
});

// Get authentication token from the server
export const authenticate = async (): Promise<AuthToken> => {
   try {
      // Now making a request to our backend server, which will handle the external API auth
      const response = await api.post("/auth", {});

      const authToken = response.data as AuthToken;

      // Update the authorization header with the new token
      api.defaults.headers.common[
         "Authorization"
      ] = `${authToken.token_type} ${authToken.access_token}`;

      return authToken;
   } catch (error) {
      logError("Authentication", error);
      throw error;
   }
};

// Set initial authentication token
api.defaults.headers.common["Authorization"] = `Bearer ${APP_CONFIG.API_TOKEN}`;

// Generic API fetch function with error handling
const apiFetch = async <T>(
   url: string,
   options?: AxiosRequestConfig
): Promise<T> => {
   try {
      const response = await api.request<T>({ url, ...options });
      return response.data;
   } catch (error) {
      logError(`API Fetch: ${url}`, error);
      throw error;
   }
};

// API functions
export const getUsers = async (): Promise<User[]> => apiFetch<User[]>("/users");

export const getUserPosts = async (userId: number): Promise<Post[]> =>
   apiFetch<Post[]>(`/users/${userId}/posts`);

// Using the backend for comments
export const getPostComments = async (postId: number): Promise<Comment[]> =>
   apiFetch<Comment[]>(`/posts/${postId}/comments`);

// Handle API errors globally
api.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         console.error("Authentication error. Token may have expired.");
         // Try to re-authenticate
         authenticate().catch((err) => {
            console.error("Failed to re-authenticate:", err);
         });
      }
      return Promise.reject(error);
   }
);

export default api;
