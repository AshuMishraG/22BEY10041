"use client";

import { useState, useEffect, useCallback } from "react";
import { getUsers, getUserPosts, User, Post } from "@/services/apiService";
import PostCard from "@/components/PostCard";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import AuthInfo from "@/components/AuthInfo";
import { RefreshCw, BarChart3, Zap, Filter, TrendingUp } from "lucide-react";
import { APP_CONFIG, API_CONFIG } from "@/config/appConfig";
import { useAuth } from "@/context/AuthContext";
import { getFriendlyErrorMessage } from "@/utils/errorHandler";
import axios from "axios";

// Mock data to display when API calls fail
const MOCK_USERS: User[] = [
   {
      id: 1,
      username: "tech_enthusiast",
      fullName: "Alex Johnson",
      email: "alex@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      postCount: 15,
   },
   {
      id: 2,
      username: "travel_addict",
      fullName: "Sarah Williams",
      email: "sarah@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      postCount: 22,
   },
   {
      id: 3,
      username: "fitness_guru",
      fullName: "Michael Chen",
      email: "michael@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      postCount: 19,
   },
];

const MOCK_POSTS: Post[] = [
   {
      id: 1,
      userId: 1,
      title: "The Future of AI Technology",
      content:
         "Artificial intelligence is revolutionizing how we work and live. From smart assistants to autonomous vehicles, AI is changing everything about our daily experiences...",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjB0ZWNobm9sb2d5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      commentCount: 24,
      likeCount: 89,
      createdAt: new Date().toISOString(),
      user: MOCK_USERS[0],
   },
   {
      id: 2,
      userId: 2,
      title: "Top 10 Travel Destinations for 2025",
      content:
         "Looking for your next adventure? These destinations offer everything from pristine beaches to breathtaking mountain views. My personal favorite this year has to be...",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHRyYXZlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      commentCount: 45,
      likeCount: 132,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      user: MOCK_USERS[1],
   },
   {
      id: 3,
      userId: 3,
      title: "Building a Sustainable Fitness Routine",
      content:
         "Starting a fitness journey is easy, but maintaining it is the real challenge. Here's how I've managed to stay consistent for over 3 years...",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zml0bmVzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      commentCount: 32,
      likeCount: 78,
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      user: MOCK_USERS[2],
   },
   {
      id: 4,
      userId: 1,
      title: "The Ethics of Machine Learning",
      content:
         "As AI systems become more prevalent in decision-making, we need to address the inherent biases and ethical considerations...",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWFjaGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      commentCount: 18,
      likeCount: 65,
      createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      user: MOCK_USERS[0],
   },
];

export default function HomePage() {
   const [users, setUsers] = useState<User[]>([]);
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
   const [useMockData, setUseMockData] = useState(false);
   const { isAuthenticated } = useAuth();

   const fetchData = useCallback(async () => {
      try {
         setLoading(true);
         setError(null);

         // First check if the backend server is running
         try {
            await axios.get(
               `${API_CONFIG.BASE_URL.replace("/api", "")}/api/health`,
               {
                  timeout: 3000, // short timeout for health check
               }
            );
         } catch (err) {
            console.log("Backend server not reachable, using mock data");
            // Instead of showing an error, use mock data
            setUsers(MOCK_USERS);
            setPosts(MOCK_POSTS);
            setUseMockData(true);
            setLoading(false);
            setLastUpdated(new Date());
            return;
         }

         // Fetch users data
         let usersData;
         try {
            usersData = await getUsers();
            setUsers(usersData);
            setUseMockData(false);
         } catch (err) {
            console.log("Failed to fetch users from API, using mock data");
            // If API call fails, use mock data instead of showing error
            setUsers(MOCK_USERS);
            setPosts(MOCK_POSTS);
            setUseMockData(true);
            setLoading(false);
            setLastUpdated(new Date());
            return;
         }

         // If we have users, fetch their posts
         if (usersData && usersData.length > 0) {
            try {
               const userPostPromises = usersData.map((user) =>
                  getUserPosts(user.id)
               );
               const userPostsResults = await Promise.allSettled(
                  userPostPromises
               );

               const allPosts = userPostsResults
                  .filter(
                     (result): result is PromiseFulfilledResult<Post[]> =>
                        result.status === "fulfilled"
                  )
                  .map((result) => result.value)
                  .flat();

               setPosts(
                  allPosts.sort(
                     (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                  )
               );
            } catch (err) {
               console.log("Failed to fetch posts from API, using mock data");
               // If post fetching fails, use mock posts
               setPosts(MOCK_POSTS);
               setUseMockData(true);
            }
         }

         setLastUpdated(new Date());
      } catch (err) {
         console.log("Error in fetchData, falling back to mock data");
         // Fall back to mock data on any error
         setUsers(MOCK_USERS);
         setPosts(MOCK_POSTS);
         setUseMockData(true);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchData();
      const interval = setInterval(fetchData, APP_CONFIG.POLLING_INTERVAL);
      return () => clearInterval(interval);
   }, [fetchData]);

   if (loading && posts.length === 0) {
      return <LoadingState message="Loading your social feed..." />;
   }

   return (
      <div className="container mx-auto px-4 py-6">
         {/* Hero Section */}
         <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg mb-8 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
               <div className="p-6 md:p-8 text-white md:w-2/3">
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                     Social Media Analytics
                  </h1>
                  <p className="text-blue-100 mb-6 max-w-lg">
                     Explore real-time insights from social media data. Find
                     trending posts, top users, and track engagement metrics in
                     one place.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <button className="flex items-center bg-white text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium transition-colors">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        View Analytics
                     </button>
                     <button className="flex items-center bg-blue-700 text-white hover:bg-blue-800 py-2 px-4 rounded-lg font-medium transition-colors">
                        <Zap className="h-5 w-5 mr-2" />
                        Get Started
                     </button>
                  </div>
               </div>
               <div className="hidden md:block md:w-1/3 p-6">
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                     <BarChart3 className="h-36 w-36 mx-auto text-white" />
                  </div>
               </div>
            </div>
         </div>

         <AuthInfo />

         {error && <ErrorState message={error} />}

         {useMockData && (
            <div className="mb-4 p-4 bg-yellow-50 text-yellow-700 rounded-md">
               <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>
                     Currently viewing sample data. The backend API is not
                     available.
                  </span>
               </div>
            </div>
         )}

         <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
               <h2 className="text-2xl font-bold text-gray-800">Social Feed</h2>
               <p className="text-gray-500">Latest updates from your network</p>
            </div>
            <div className="flex items-center space-x-4">
               <div className="flex items-center text-sm bg-gray-100 px-3 py-1.5 rounded-full">
                  <Filter className="h-4 w-4 mr-1 text-gray-500" />
                  <select className="bg-transparent border-none text-gray-700 font-medium focus:outline-none">
                     <option>Latest</option>
                     <option>Most Popular</option>
                     <option>Most Commented</option>
                  </select>
               </div>
               <button
                  onClick={fetchData}
                  disabled={loading}
                  className="flex items-center text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-full disabled:opacity-50 transition-colors"
               >
                  <RefreshCw
                     className={`h-4 w-4 mr-1.5 ${
                        loading ? "animate-spin" : ""
                     }`}
                  />
                  Refresh
               </button>
               <span className="text-sm text-gray-500 hidden md:inline">
                  Updated: {lastUpdated.toLocaleTimeString()}
               </span>
            </div>
         </div>

         {loading && posts.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
               <div className="flex items-center">
                  <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                  Refreshing your feed...
               </div>
            </div>
         )}

         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
               <PostCard key={post.id} post={post} />
            ))}
         </div>

         {posts.length === 0 && !loading && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
               <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <BarChart3 className="h-8 w-8 text-gray-400" />
               </div>
               <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No posts to display
               </h3>
               <p className="text-gray-500 max-w-md mx-auto">
                  It seems there are no posts available right now. Try
                  refreshing the page or check back later.
               </p>
               <button
                  onClick={fetchData}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
               >
                  Refresh Feed
               </button>
            </div>
         )}
      </div>
   );
}
