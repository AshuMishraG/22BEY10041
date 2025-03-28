import express from "express";
import cors from "cors";
import morgan from "morgan";

// Import routes
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import { PORT } from "./config/appConfig";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check endpoint - no authentication required
app.get("/api/health", (req, res) => {
   res.status(200).json({
      status: "ok",
      message: "Backend server is running",
      timestamp: new Date().toISOString(),
   });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Error handling middleware
app.use(
   (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
   ) => {
      console.error("Error:", err.message);
      const statusCode = err.statusCode || 500;
      res.status(statusCode).json({
         error: err.message || "Something went wrong",
         stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
      });
   }
);

// Start the server
const server = app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle shutdown gracefully
process.on("SIGTERM", () => {
   console.log("SIGTERM signal received: closing HTTP server");
   server.close(() => {
      console.log("HTTP server closed");
   });
});

export default app;
