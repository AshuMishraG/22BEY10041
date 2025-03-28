"use client";

import { useState, useEffect, useCallback } from "react";
import { getUsers, User } from "@/services/apiService";
import UserCard from "@/components/UserCard";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import AuthInfo from "@/components/AuthInfo";
import { RefreshCw } from "lucide-react";

// Mock data for when API calls fail
const MOCK_TOP_USERS: User[] = [
   {
      id: 1,
      username: "travel_addict",
      fullName: "Sarah Williams",
      email: "sarah@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      postCount: 48,
   },
   {
      id: 2,
      username: "tech_enthusiast",
      fullName: "Alex Johnson",
      email: "alex@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      postCount: 42,
   },
   {
      id: 3,
      username: "fitness_guru",
      fullName: "Michael Chen",
      email: "michael@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      postCount: 37,
   },
   {
      id: 4,
      username: "food_blogger",
      fullName: "Emma Rodriguez",
      email: "emma@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      postCount: 29,
   },
   {
      id: 5,
      username: "photo_master",
      fullName: "David Kim",
      email: "david@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
      postCount: 24,
   },
];

export default function TopUsersPage() {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
   const [useMockData, setUseMockData] = useState(false);

   const fetchData = useCallback(async () => {
      try {
         setLoading(true);
         setError(null);

         try {
            const usersData = await getUsers();

            // Sort users by post count in descending order
            const topUsers = [...usersData]
               .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
               .slice(0, 5); // Get top 5 users

            setUsers(topUsers);
            setUseMockData(false);
         } catch (err) {
            console.log("Failed to fetch users from API, using mock data");
            // Fall back to mock data
            setUsers(MOCK_TOP_USERS);
            setUseMockData(true);
         }

         setLastUpdated(new Date());
      } catch (err) {
         console.log("Error in fetchData, falling back to mock data");
         // Fall back to mock data on any error
         setUsers(MOCK_TOP_USERS);
         setUseMockData(true);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   if (loading && users.length === 0) {
      return <LoadingState message="Loading top users..." />;
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <AuthInfo />

         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Top Users</h1>
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
                     Currently viewing sample user data. The backend API is not
                     available.
                  </span>
               </div>
            </div>
         )}

         {loading && users.length > 0 && (
            <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
               Refreshing data...
            </div>
         )}

         <div className="space-y-4">
            {users.map((user, index) => (
               <UserCard key={user.id} user={user} rank={index + 1} />
            ))}
         </div>

         {users.length === 0 && !loading && (
            <div className="text-center py-12">
               <p className="text-gray-500">No users to display.</p>
            </div>
         )}
      </div>
   );
}
