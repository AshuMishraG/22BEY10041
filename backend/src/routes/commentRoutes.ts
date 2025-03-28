import express from "express";

const router = express.Router();

// This route is mostly for structure - the actual comments are fetched through post routes
router.get("/", (req, res) => {
   res.json({ message: "Comments API endpoint" });
});

export default router;
