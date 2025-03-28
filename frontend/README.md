# Social Media Analytics Frontend

This is the frontend application for the Social Media Analytics platform. It provides a beautiful user interface to visualize and interact with social media data.

## Features

-  Dashboard with key metrics and statistics
-  User analytics and profiles
-  Post viewing and analytics
-  Comment analysis
-  Interactive charts and data visualization

## Technologies

-  Next.js 14
-  React
-  Bootstrap for responsive UI
-  Chart.js for data visualization
-  TypeScript for type safety

## Getting Started

### Prerequisites

-  Node.js 18.0.0 or higher
-  npm or yarn
-  Backend API service running

### Installation

1. Install dependencies:

   ```
   npm install
   ```

2. Run the development server:

   ```
   npm run dev
   ```

3. Build for production:

   ```
   npm run build
   ```

4. Start the production server:
   ```
   npm start
   ```

## Project Structure

-  `src/app`: Next.js app router pages
-  `src/components`: Reusable UI components
-  `src/services`: API service and type definitions
-  `public`: Static assets

## Pages

-  `/`: Dashboard with overview of analytics
-  `/users`: List of all users
-  `/users/[userId]`: Individual user profile with their posts
-  `/posts`: List of all posts
-  `/posts/[postId]`: Individual post with comments
-  `/analytics`: Detailed analytics with charts and visualizations

## API Integration

The application integrates with the backend service, which in turn communicates with the social media API. The API endpoints include:

-  Get Users
-  Get User Posts
-  Get Post Comments
