import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

console.log("API Configuration:");
console.log(`Base URL: ${API_BASE_URL}`);
console.log(`Token (first 20 chars): ${ACCESS_TOKEN?.substring(0, 20)}...`);

// Create axios instance with default config
const apiClient = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
   },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
   (config) => {
      console.log(`Making request to: ${config.baseURL}${config.url}`);
      return config;
   },
   (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
   }
);

// Add response interceptor for logging
apiClient.interceptors.response.use(
   (response) => {
      console.log(
         `Response from ${response.config.url}: Status ${response.status}`
      );
      return response;
   },
   (error) => {
      console.error(`API Error: ${error.message}`);
      if (error.response) {
         console.error(`Status: ${error.response.status}`);
         console.error(`Response data:`, error.response.data);
      }
      return Promise.reject(error);
   }
);

// API service methods
export const getUsers = async () => {
   try {
      console.log("Fetching users...");
      const response = await apiClient.get("/users");
      console.log(`Retrieved ${response.data.length} users`);
      return response.data;
   } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
   }
};

export const getUserPosts = async (userId: string) => {
   try {
      console.log(`Fetching posts for user ${userId}...`);
      const response = await apiClient.get(`/users/${userId}/posts`);
      console.log(`Retrieved ${response.data.length} posts for user ${userId}`);
      return response.data;
   } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error);
      throw error;
   }
};

export const getPostComments = async (postId: string) => {
   try {
      console.log(`Fetching comments for post ${postId}...`);
      const response = await apiClient.get(`/posts/${postId}/comments`);
      console.log(
         `Retrieved ${response.data.length} comments for post ${postId}`
      );
      return response.data;
   } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      throw error;
   }
};

export default {
   getUsers,
   getUserPosts,
   getPostComments,
};
