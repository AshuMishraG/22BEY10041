import axios, { AxiosRequestConfig } from "axios";
import { APP_CONFIG } from "@/config/appConfig";
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

// Create axios instance with base URL and authentication
const api = axios.create({
   baseURL: APP_CONFIG.API_BASE_URL,
   headers: {
      Authorization: `Bearer ${APP_CONFIG.API_TOKEN}`,
      "Content-Type": "application/json",
   },
   timeout: APP_CONFIG.API_TIMEOUT,
});

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

export const getPostComments = async (postId: number): Promise<Comment[]> =>
   apiFetch<Comment[]>(`/posts/${postId}/comments`);

// Handle API errors globally
api.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         console.error("Authentication error. Token may have expired.");
         // Implement token refresh or redirect to login if needed
      }
      return Promise.reject(error);
   }
);

export default api;
