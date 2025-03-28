import express from "express";
import { getAuthToken } from "../services/authService";
import { AUTH_CONFIG } from "../config/appConfig";

const router = express.Router();

// POST /api/auth - Get authentication token
router.post("/", async (req, res) => {
   try {
      const authToken = await getAuthToken();
      res.json(authToken);
   } catch (error) {
      console.error("Authentication error:", error);
      res.status(500).json({ error: "Authentication failed" });
   }
});

// GET /api/auth/credentials - Get API credentials
router.get("/credentials", (req, res) => {
   res.json({
      companyName: AUTH_CONFIG.API_CREDENTIALS.companyName,
      clientID: AUTH_CONFIG.API_CREDENTIALS.clientID,
      ownerName: AUTH_CONFIG.API_CREDENTIALS.ownerName,
      ownerEmail: AUTH_CONFIG.API_CREDENTIALS.ownerEmail,
      rollNo: AUTH_CONFIG.API_CREDENTIALS.rollNo,
   });
});

export const authRoutes = router;
