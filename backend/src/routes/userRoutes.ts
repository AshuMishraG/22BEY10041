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

// GET all users
router.get("/", async (req, res) => {
   try {
      console.log("Fetching all users from external API...");

      const response = await axios.get("http://20.244.56.144/test/users", {
         timeout: 15000,
         headers: {
            Authorization: `Bearer ${req.token}`,
         },
      });

      console.log(`Successfully fetched ${response.data.length} users`);
      return res.json(response.data);
   } catch (error) {
      console.error("Error fetching users:", error.message);

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
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return res.status(error.response.status).json({
               error: `External API returned error: ${error.response.status} ${error.response.statusText}`,
               details: error.response.data,
            });
         } else if (error.request) {
            // The request was made but no response was received
            return res.status(504).json({
               error: "No response received from the external API. Please try again later.",
            });
         }
      }

      // For all other types of errors
      return res.status(500).json({
         error: "Failed to fetch users from the external API",
         details: error.message,
      });
   }
});

// GET top users by post count
router.get("/top", async (req, res) => {
   try {
      console.log("Fetching top users by post count...");

      const response = await axios.get("http://20.244.56.144/test/users", {
         timeout: 15000,
         headers: {
            Authorization: `Bearer ${req.token}`,
         },
      });

      // Sort users by post count in descending order
      const sortedUsers = [...response.data].sort(
         (a, b) => b.postCount - a.postCount
      );

      // Return the top 5 users
      const topUsers = sortedUsers.slice(0, 5);

      console.log(`Successfully fetched top ${topUsers.length} users`);
      return res.json(topUsers);
   } catch (error) {
      console.error("Error fetching top users:", error.message);

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
         error: "Failed to fetch top users from the external API",
         details: error.message,
      });
   }
});

// GET user by ID
router.get("/:id", async (req, res) => {
   try {
      const userId = req.params.id;
      console.log(`Fetching user with ID: ${userId}`);

      const response = await axios.get(
         `http://20.244.56.144/test/users/${userId}`,
         {
            timeout: 15000,
            headers: {
               Authorization: `Bearer ${req.token}`,
            },
         }
      );

      console.log(`Successfully fetched user with ID: ${userId}`);
      return res.json(response.data);
   } catch (error) {
      console.error(
         `Error fetching user with ID ${req.params.id}:`,
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
                  .json({ error: `User with ID ${req.params.id} not found` });
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
         error: `Failed to fetch user with ID ${req.params.id}`,
         details: error.message,
      });
   }
});

// GET user posts
router.get("/:userId/posts", async (req, res) => {
   try {
      const userId = req.params.userId;
      console.log(`Fetching posts for user with ID: ${userId}`);

      const response = await axios.get("http://20.244.56.144/test/posts", {
         timeout: 15000,
         headers: {
            Authorization: `Bearer ${req.token}`,
         },
      });

      // Filter posts for the specific user
      const userPosts = response.data.filter((post) => post.userId === userId);

      console.log(
         `Successfully fetched ${userPosts.length} posts for user with ID: ${userId}`
      );
      return res.json(userPosts);
   } catch (error) {
      console.error(
         `Error fetching posts for user with ID ${req.params.userId}:`,
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
         error: `Failed to fetch posts for user with ID ${req.params.userId} from the external API`,
         details: error.message,
      });
   }
});

export const userRoutes = router;
