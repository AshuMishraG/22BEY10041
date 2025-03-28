# Social Media Analytics Application (22BEY10041)

A modern social media analytics dashboard developed with Next.js, featuring:

-  User analytics
-  Post engagement metrics
-  Trending content analysis
-  Interactive UI components

## Project Structure

The project is organized as follows:

```
22BEY10041/
├── frontend/            # Next.js frontend application
│   ├── app/             # Next.js app pages and components
│   ├── components/      # Reusable UI components
│   ├── context/         # Context providers (e.g., Auth)
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   └── config/          # Configuration files
```

## Authentication

The application uses a Bearer token authentication mechanism with the following endpoint:

-  Auth API: `http://20.244.56.144/test/auth`

## Getting Started

### Prerequisites

-  Node.js 16+ and npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AshuMishraG/22BEY10041.git
cd 22BEY10041
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

### Running the Application

1. Start the frontend development server:

```bash
cd frontend
npm run dev
```

2. Open your browser and navigate to:

```
http://localhost:3000
```

## Features

-  **Dashboard**: Overview of key social media metrics
-  **User Analytics**: User engagement and growth statistics
-  **Post Analytics**: Content performance metrics
-  **Trending Analysis**: Identify trending topics and content

## Tech Stack

-  **Frontend**: Next.js, React, TypeScript, TailwindCSS
-  **Authentication**: JWT-based auth system
-  **Styling**: Modern UI with animations and responsive design
