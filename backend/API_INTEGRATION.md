# Social Media Analytics API Integration

## Overview

This document outlines how the backend integrates with the external social media analytics API.

## API Endpoints

The application integrates with the following API endpoints:

1. **Authentication API**

   -  Method: POST
   -  Endpoint: `http://20.244.56.144/test/auth`
   -  Payload:
      ```json
      {
         "companyName": "SocialApp",
         "clientID": "62d73af2-3257-4030-b451-f6e1c8c1bc33",
         "clientSecret": "GVyvrEmByQmqSZoA",
         "ownerName": "Ashutosh",
         "ownerEmail": "ashutoshmishra2022@vitbhopal.ac.in",
         "rollNo": "22BEY10041"
      }
      ```
   -  Response:
      ```json
      {
         "token_type": "Bearer",
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTM5MzkxLCJpYXQiOjE3NDMxMzkwOTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsInN1YiI6ImFzaHV0b3NobWlzaHJhMjAyMkB2aXRiaG9wYWwuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTb2NpYWxBcHAiLCJjbGllbnRJRCI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsImNsaWVudFNlY3JldCI6IkdWeXZyRW1CeVFtcVNab0EiLCJvd25lck5hbWUiOiJBc2h1dG9zaCIsIm93bmVyRW1haWwiOiJhc2h1dG9zaG1pc2hyYTIwMjJAdml0YmhvcGFsLmFjLmluIiwicm9sbE5vIjoiMjJCRVkxMDA0MSJ9.5XiwrD6xOXOAREY0PFDdZEvTJHaynAcQt0wsqifpoXk",
         "expires_in": 1743139391
      }
      ```

2. **Get Users API**

   -  Method: GET
   -  Endpoint: `http://20.244.56.144/test/users`
   -  Description: Retrieves a list of users registered on the social media application.

3. **Get User Posts API**

   -  Method: GET
   -  Endpoint: `http://20.244.56.144/test/users/{userid}/posts`
   -  Description: Retrieves posts authored by a specific user.

4. **Get Post Comments API**
   -  Method: GET
   -  Endpoint: `http://20.244.56.144/test/posts/{postid}/comments`
   -  Description: Retrieves comments for a specific post.
   -  Example: `http://20.244.56.144/test/posts/150/comments` (for post ID 150)

## Implementation Details

### Authentication

The application uses a token-based authentication approach:

1. The authentication token is cached to minimize requests to the auth endpoint.
2. Token is refreshed automatically when it expires or is about to expire.
3. All API requests include the authentication token in the `Authorization` header.

### API Clients

The backend uses a single API client for all endpoints:

-  API client for `http://20.244.56.144/test`

### Error Handling

All API requests include proper error handling:

1. Network errors are caught and logged
2. Authentication errors trigger a token refresh
3. API response errors are properly formatted and returned to the client

## Configuration

API configuration is centralized in `src/config/appConfig.ts`, making it easy to update endpoints or credentials if needed.
