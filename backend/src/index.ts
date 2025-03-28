import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes";
import { postRoutes } from "./routes/postRoutes";
import { authRoutes } from "./routes/authRoutes";
import { CORS_CONFIG, SERVER_CONFIG, API_ROUTES } from "./config/appConfig";

const app = express();
const port = SERVER_CONFIG.PORT;

// Middleware
app.use(
   cors({
      origin: CORS_CONFIG.ORIGIN,
      methods: CORS_CONFIG.METHODS,
      credentials: CORS_CONFIG.CREDENTIALS,
   })
);
app.use(express.json());

// Routes
app.use(API_ROUTES.USERS, userRoutes);
app.use(API_ROUTES.POSTS, postRoutes);
app.use(API_ROUTES.AUTH, authRoutes);

app.get(API_ROUTES.HEALTH, (_, res) => {
   res.json({ status: "ok" });
});

// Start server
app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
