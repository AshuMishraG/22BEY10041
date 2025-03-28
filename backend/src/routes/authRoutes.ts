import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Get auth info
router.get("/info", (req, res) => {
   res.json({
      companyName: process.env.COMPANY_NAME,
      clientID: process.env.CLIENT_ID,
      ownerName: process.env.OWNER_NAME,
      ownerEmail: process.env.OWNER_EMAIL,
      rollNo: process.env.ROLL_NO,
   });
});

// Provide the access token
router.get("/token", (req, res) => {
   res.json({
      token_type: "Bearer",
      access_token: process.env.ACCESS_TOKEN,
      expires_in: 1743139391,
   });
});

export default router;
