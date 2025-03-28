# Social Media Analytics Backend

This is the backend service for the Social Media Analytics application. It provides API endpoints to fetch data from social media sources.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=5000
   API_BASE_URL=http://20.244.56.144/test
   ACCESS_TOKEN=your_access_token
   COMPANY_NAME=SocialApp
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   OWNER_NAME=YourName
   OWNER_EMAIL=your.email@example.com
   ROLL_NO=YourRollNo
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

-  `GET /api/auth/info` - Get authentication info
-  `GET /api/auth/token` - Get access token

### Users

-  `GET /api/users` - Get all users
-  `GET /api/users/:userId/posts` - Get posts by user ID

### Posts

-  `GET /api/posts/:postId/comments` - Get comments for a post

### Comments

-  `GET /api/comments` - Comments API endpoint

## Technologies Used

-  Node.js
-  Express
-  TypeScript
-  Axios
