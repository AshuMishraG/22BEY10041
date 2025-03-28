import express from "express";
import { getUsers, getUserPosts } from "../services/apiService";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
   try {
      const users = await getUsers();
      res.json(users);
   } catch (error: any) {
      res.status(500).json({
         message: "Failed to fetch users",
         error: error.message,
      });
   }
});

// Get posts by user ID
router.get("/:userId/posts", async (req, res) => {
   try {
      const { userId } = req.params;
      const posts = await getUserPosts(userId);
      res.json(posts);
   } catch (error: any) {
      res.status(500).json({
         message: `Failed to fetch posts for user ${req.params.userId}`,
         error: error.message,
      });
   }
});

export default router;
