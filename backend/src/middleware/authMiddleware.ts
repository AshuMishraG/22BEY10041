import { Request, Response, NextFunction } from "express";
import { AUTH_CONFIG } from "../config/appConfig";

/**
 * Authentication middleware to validate API requests
 */

// Interface for extended request with user information
export interface AuthenticatedRequest extends Request {
   user?: {
      clientID: string;
      companyName: string;
      ownerName: string;
      ownerEmail: string;
      rollNo: string;
   };
}

// Middleware to verify JWT token in request headers
export const authenticateToken = (
   req: AuthenticatedRequest,
   res: Response,
   next: NextFunction
) => {
   const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.split(" ")[1];

   if (!token) {
      return res
         .status(401)
         .json({ error: "Authentication token is required" });
   }

   // In a real app, we would verify the token
   // For this example, we'll just check if it matches our stored token
   if (token !== AUTH_CONFIG.TOKEN.access_token) {
      return res.status(403).json({ error: "Invalid or expired token" });
   }

   // Add user info to request
   req.user = {
      clientID: AUTH_CONFIG.API_CREDENTIALS.clientID,
      companyName: AUTH_CONFIG.API_CREDENTIALS.companyName,
      ownerName: AUTH_CONFIG.API_CREDENTIALS.ownerName,
      ownerEmail: AUTH_CONFIG.API_CREDENTIALS.ownerEmail,
      rollNo: AUTH_CONFIG.API_CREDENTIALS.rollNo,
   };

   next();
};

// Export middleware
export default authenticateToken;
