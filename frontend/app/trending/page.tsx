"use client";

import { useState, useEffect, useCallback } from "react";
import { getUsers, getUserPosts, User, Post } from "@/services/apiService";
import PostCard from "@/components/PostCard";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import AuthInfo from "@/components/AuthInfo";
import { RefreshCw } from "lucide-react";

// Mock data for when API fails
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

// Mock trending posts with high comment counts
const MOCK_TRENDING_POSTS: Post[] = [
   {
      id: 1,
      userId: 2,
      title: "The Top Travel Destinations You Need to Visit",
      content:
         "After visiting over 30 countries, I've compiled my list of must-see destinations. These places offer the perfect combination of culture, food, and unforgettable experiences...",
      image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      commentCount: 89,
      likeCount: 245,
      createdAt: new Date().toISOString(),
      user: MOCK_USERS[1],
   },
   {
      id: 2,
      userId: 3,
      title: "How I Lost 30 Pounds in 3 Months - My Complete Routine",
      content:
         "My transformation journey wasn't easy, but with consistent effort and the right approach to nutrition and exercise, I achieved results faster than I expected...",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29ya291dHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      commentCount: 76,
      likeCount: 203,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      user: MOCK_USERS[2],
   },
   {
      id: 3,
      userId: 1,
      title: "The New AI Revolution: What You Need to Know",
      content:
         "Artificial intelligence is evolving at an unprecedented pace. Here's what you need to understand about the latest breakthroughs and how they'll impact your career and daily life...",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      commentCount: 64,
      likeCount: 178,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      user: MOCK_USERS[0],
   },
   {
      id: 4,
      userId: 2,
      title: "5 Hidden Gems in Europe That Tourists Don't Know About",
      content:
         "Forget the crowded tourist spots and discover these authentic European destinations that offer incredible experiences without the crowds and high prices...",
      image: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZXVyb3BlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      commentCount: 57,
      likeCount: 163,
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      user: MOCK_USERS[1],
   },
   {
      id: 5,
      userId: 3,
      title: "The Ultimate Morning Routine for Productivity",
      content:
         "How you start your day determines how productive you'll be. I've tested dozens of morning routines and found this specific combination to be the most effective for focus and energy...",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9ybmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      commentCount: 52,
      likeCount: 145,
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      user: MOCK_USERS[2],
   },
];

export default function TrendingPostsPage() {
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
   const [useMockData, setUseMockData] = useState(false);

   const fetchData = useCallback(async () => {
      try {
         setLoading(true);
         setError(null);

         try {
            // Fetch all users
            const usersData = await getUsers();

            // Fetch posts for all users
            const allPosts = await Promise.all(
               usersData.map((user) => getUserPosts(user.id))
            ).then((userPosts) => userPosts.flat());

            // Sort posts by comment count in descending order
            const trendingPosts = [...allPosts]
               .sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0))
               .slice(0, 5); // Get top 5 posts

            setPosts(trendingPosts);
            setUseMockData(false);
         } catch (err) {
            console.log("Failed to fetch data from API, using mock data");
            // Fall back to mock data
            setPosts(MOCK_TRENDING_POSTS);
            setUseMockData(true);
         }

         setLastUpdated(new Date());
      } catch (err) {
         console.log("Error in fetchData, falling back to mock data");
         // Fall back to mock data on any error
         setPosts(MOCK_TRENDING_POSTS);
         setUseMockData(true);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   if (loading && posts.length === 0) {
      return <LoadingState message="Loading trending posts..." />;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <AuthInfo />

         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Trending Posts</h1>
            <div className="flex items-center space-x-4">
               <button
                  onClick={fetchData}
                  disabled={loading}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
               >
                  <RefreshCw
                     className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
               </button>
               <span className="text-sm text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
               </span>
            </div>
         </div>

         {error && <ErrorState message={error} />}

         {useMockData && (
            <div className="mb-4 p-4 bg-yellow-50 text-yellow-700 rounded-md">
               <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>
                     Currently viewing sample trending data. The backend API is
                     not available.
                  </span>
               </div>
            </div>
         )}

         {loading && posts.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
               Refreshing data...
            </div>
         )}

         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
               <PostCard key={post.id} post={post} isTrending={true} />
            ))}
         </div>

         {posts.length === 0 && !loading && (
            <div className="text-center py-12">
               <p className="text-gray-500">No trending posts to display.</p>
            </div>
         )}
      </div>
   );
}
