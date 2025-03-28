/**
 * Application configuration settings
 */

// API Configuration
export const API_CONFIG = {
   // Base URL for API endpoints
   BASE_URL: "http://localhost:3001/api",

   // API Credentials
   CREDENTIALS: {
      companyName: "SocialApp",
      clientID: "62d73af2-3257-4030-b451-f6e1c8c1bc33",
      clientSecret: "GVyvrEmByQmqSZoA",
      ownerName: "Ashutosh",
      ownerEmail: "ashutoshmishra2022@vitbhopal.ac.in",
      rollNo: "22BEY10041",
   },

   // Authentication settings
   AUTH: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTM5MzkxLCJpYXQiOjE3NDMxMzkwOTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsInN1YiI6ImFzaHV0b3NobWlzaHJhMjAyMkB2aXRiaG9wYWwuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTb2NpYWxBcHAiLCJjbGllbnRJRCI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsImNsaWVudFNlY3JldCI6IkdWeXZyRW1CeVFtcVNab0EiLCJvd25lck5hbWUiOiJBc2h1dG9zaCIsIm93bmVyRW1haWwiOiJhc2h1dG9zaG1pc2hyYTIwMjJAdml0YmhvcGFsLmFjLmluIiwicm9sbE5vIjoiMjJCRVkxMDA0MSJ9.5XiwrD6xOXOAREY0PFDdZEvTJHaynAcQt0wsqifpoXk",
      tokenType: "Bearer",
      expiresIn: 1743139391,
   },

   // API Endpoints
   ENDPOINTS: {
      USERS: {
         ALL: "/users",
         TOP: "/users/top",
         BY_ID: (id: number) => `/users/${id}`,
      },
      POSTS: {
         ALL: "/posts",
         TRENDING: "/posts/trending",
         BY_ID: (id: number) => `/posts/${id}`,
      },
   },
};

// App Settings
export const APP_CONFIG = {
   NAME: "Social Media Analytics",
   API_BASE_URL: "http://localhost:3001/api",
   API_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTM5MzkxLCJpYXQiOjE3NDMxMzkwOTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsInN1YiI6ImFzaHV0b3NobWlzaHJhMjAyMkB2aXRiaG9wYWwuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTb2NpYWxBcHAiLCJjbGllbnRJRCI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsImNsaWVudFNlY3JldCI6IkdWeXZyRW1CeVFtcVNab0EiLCJvd25lck5hbWUiOiJBc2h1dG9zaCIsIm93bmVyRW1haWwiOiJhc2h1dG9zaG1pc2hyYTIwMjJAdml0YmhvcGFsLmFjLmluIiwicm9sbE5vIjoiMjJCRVkxMDA0MSJ9.5XiwrD6xOXOAREY0PFDdZEvTJHaynAcQt0wsqifpoXk",
   API_TIMEOUT: 15000,
   POLLING_INTERVAL: 30000,

   AUTH: {
      TOKEN_TYPE: "Bearer",
      EXPIRES_IN: 1743139391,
      CREDENTIALS: {
         COMPANY_NAME: "SocialApp",
         CLIENT_ID: "62d73af2-3257-4030-b451-f6e1c8c1bc33",
         CLIENT_SECRET: "GVyvrEmByQmqSZoA",
         OWNER_NAME: "Ashutosh",
         OWNER_EMAIL: "ashutoshmishra2022@vitbhopal.ac.in",
         ROLL_NO: "22BEY10041",
      },
   },

   ENDPOINTS: {
      USERS: "/users",
      POSTS: (userId: number) => `/users/${userId}/posts`,
      COMMENTS: (postId: number) => `/posts/${postId}/comments`,
   },
};

export default APP_CONFIG;
