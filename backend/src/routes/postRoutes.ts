import express from "express";
import authenticateToken from "../middleware/authMiddleware";
import { createAuthenticatedClient } from "../services/authService";
import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Helper function to handle errors
const handleApiError = (
   error: any,
   errorMessage: string,
   res: express.Response
) => {
   if (axios.isAxiosError(error)) {
      console.error(`${errorMessage}:`, {
         status: error.response?.status,
         data: error.response?.data,
         message: error.message,
      });

      return res.status(error.response?.status || 500).json({
         error: errorMessage,
         details: error.response?.data || error.message,
         code: error.code,
      });
   }

   console.error(`${errorMessage}:`, error);
   return res.status(500).json({ error: errorMessage });
};

// GET all posts
router.get("/", async (req, res) => {
   try {
      console.log("Fetching all posts from external API...");

      const response = await axios.get("http://20.244.56.144/test/posts", {
         timeout: 15000,
         headers: {
            Authorization: `Bearer ${req.token}`,
         },
      });

      console.log(`Successfully fetched ${response.data.length} posts`);
      return res.json(response.data);
   } catch (error) {
      return handleApiError(
         error,
         "Failed to fetch posts from the external API",
         res
      );
   }
});

// GET trending posts (posts with highest comment counts)
router.get("/trending", async (req, res) => {
   try {
      console.log("Fetching trending posts by comment count...");

      const response = await axios.get("http://20.244.56.144/test/posts", {
         timeout: 15000,
         headers: {
            Authorization: `Bearer ${req.token}`,
         },
      });

      // Sort posts by comment count in descending order
      const sortedPosts = [...response.data].sort(
         (a, b) => b.commentCount - a.commentCount
      );

      // Return the top 5 posts
      const trendingPosts = sortedPosts.slice(0, 5);

      console.log(
         `Successfully fetched top ${trendingPosts.length} trending posts`
      );
      return res.json(trendingPosts);
   } catch (error) {
      console.error("Error fetching trending posts:", error.message);

      // Provide more specific error messages based on the error type
      if (axios.isAxiosError(error)) {
         if (error.code === "ECONNABORTED") {
            return res.status(504).json({
               error: "Connection to the external API timed out. Please try again later.",
            });
         }

         if (error.code === "ECONNREFUSED") {
            return res.status(503).json({
               error: "Unable to connect to the external API. The service might be down.",
            });
         }

         if (error.response) {
            return res.status(error.response.status).json({
               error: `External API returned error: ${error.response.status} ${error.response.statusText}`,
               details: error.response.data,
            });
         } else if (error.request) {
            return res.status(504).json({
               error: "No response received from the external API. Please try again later.",
            });
         }
      }

      return res.status(500).json({
         error: "Failed to fetch trending posts from the external API",
         details: error.message,
      });
   }
});

// GET post by ID
router.get("/:id", async (req, res) => {
   try {
      const postId = req.params.id;
      console.log(`Fetching post with ID: ${postId}`);

      const response = await axios.get(
         `http://20.244.56.144/test/posts/${postId}`,
         {
            timeout: 15000,
            headers: {
               Authorization: `Bearer ${req.token}`,
            },
         }
      );

      console.log(`Successfully fetched post with ID: ${postId}`);
      return res.json(response.data);
   } catch (error) {
      console.error(
         `Error fetching post with ID ${req.params.id}:`,
         error.message
      );

      // Provide more specific error messages based on the error type
      if (axios.isAxiosError(error)) {
         if (error.code === "ECONNABORTED") {
            return res.status(504).json({
               error: "Connection to the external API timed out. Please try again later.",
            });
         }

         if (error.code === "ECONNREFUSED") {
            return res.status(503).json({
               error: "Unable to connect to the external API. The service might be down.",
            });
         }

         if (error.response) {
            if (error.response.status === 404) {
               return res
                  .status(404)
                  .json({ error: `Post with ID ${req.params.id} not found` });
            }

            return res.status(error.response.status).json({
               error: `External API returned error: ${error.response.status} ${error.response.statusText}`,
               details: error.response.data,
            });
         } else if (error.request) {
            return res.status(504).json({
               error: "No response received from the external API. Please try again later.",
            });
         }
      }

      return res.status(500).json({
         error: `Failed to fetch post with ID ${req.params.id} from the external API`,
         details: error.message,
      });
   }
});

// GET post comments
router.get("/:postId/comments", async (req, res) => {
   try {
      const postId = req.params.postId;
      console.log(`Fetching comments for post with ID: ${postId}`);

      const response = await axios.get(
         `http://20.244.56.144/test/posts/${postId}/comments`,
         {
            timeout: 15000,
            headers: {
               Authorization: `Bearer ${req.token}`,
            },
         }
      );

      console.log(
         `Successfully fetched ${response.data.length} comments for post with ID: ${postId}`
      );
      return res.json(response.data);
   } catch (error) {
      console.error(
         `Error fetching comments for post with ID ${req.params.postId}:`,
         error.message
      );

      // Provide more specific error messages based on the error type
      if (axios.isAxiosError(error)) {
         if (error.code === "ECONNABORTED") {
            return res.status(504).json({
               error: "Connection to the external API timed out. Please try again later.",
            });
         }

         if (error.code === "ECONNREFUSED") {
            return res.status(503).json({
               error: "Unable to connect to the external API. The service might be down.",
            });
         }

         if (error.response) {
            return res.status(error.response.status).json({
               error: `External API returned error: ${error.response.status} ${error.response.statusText}`,
               details: error.response.data,
            });
         } else if (error.request) {
            return res.status(504).json({
               error: "No response received from the external API. Please try again later.",
            });
         }
      }

      return res.status(500).json({
         error: `Failed to fetch comments for post with ID ${req.params.postId} from the external API`,
         details: error.message,
      });
   }
});

export const postRoutes = router;
