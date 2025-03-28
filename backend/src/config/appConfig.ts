/**
 * Application configuration settings
 */

// Server Configuration
export const SERVER_CONFIG = {
   PORT: process.env.PORT || 3001,
   NODE_ENV: process.env.NODE_ENV || "development",
};

// Authentication Settings
export const AUTH_CONFIG = {
   API_URL: "http://20.244.56.144/test",
   API_CREDENTIALS: {
      companyName: "SocialApp",
      clientID: "62d73af2-3257-4030-b451-f6e1c8c1bc33",
      clientSecret: "GVyvrEmByQmqSZoA",
      ownerName: "Ashutosh",
      ownerEmail: "ashutoshmishra2022@vitbhopal.ac.in",
      rollNo: "22BEY10041",
   },
   TOKEN: {
      token_type: "Bearer",
      access_token:
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTM5MzkxLCJpYXQiOjE3NDMxMzkwOTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsInN1YiI6ImFzaHV0b3NobWlzaHJhMjAyMkB2aXRiaG9wYWwuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTb2NpYWxBcHAiLCJjbGllbnRJRCI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsImNsaWVudFNlY3JldCI6IkdWeXZyRW1CeVFtcVNab0EiLCJvd25lck5hbWUiOiJBc2h1dG9zaCIsIm93bmVyRW1haWwiOiJhc2h1dG9zaG1pc2hyYTIwMjJAdml0YmhvcGFsLmFjLmluIiwicm9sbE5vIjoiMjJCRVkxMDA0MSJ9.5XiwrD6xOXOAREY0PFDdZEvTJHaynAcQt0wsqifpoXk",
      expires_in: 1743139391,
   },
   // API connection settings
   API_TIMEOUT: 15000, // 15 seconds
   API_RETRY_ATTEMPTS: 3,
   API_RETRY_DELAY: 1000, // 1 second
};

// CORS Configuration
export const CORS_CONFIG = {
   ORIGIN: process.env.CORS_ORIGIN || "*",
   METHODS: ["GET", "POST", "PUT", "DELETE"],
   CREDENTIALS: true,
};

// API Routes
export const API_ROUTES = {
   USERS: "/api/users",
   POSTS: "/api/posts",
   AUTH: "/api/auth",
   HEALTH: "/api/health",
};

export default {
   SERVER_CONFIG,
   AUTH_CONFIG,
   CORS_CONFIG,
   API_ROUTES,
};
