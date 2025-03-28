import express from "express";
import { getPostComments } from "../services/apiService";

const router = express.Router();

// Get comments for a post
router.get("/:postId/comments", async (req, res) => {
   try {
      const { postId } = req.params;
      const comments = await getPostComments(postId);
      res.json(comments);
   } catch (error: any) {
      res.status(500).json({
         message: `Failed to fetch comments for post ${req.params.postId}`,
         error: error.message,
      });
   }
});

export default router;
