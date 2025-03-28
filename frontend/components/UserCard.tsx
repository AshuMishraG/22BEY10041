"use client";

import Image from "next/image";
import { User } from "@/services/apiService";
import {
   FileText,
   Award,
   Star,
   Mail,
   ExternalLink,
   Users,
   Bookmark,
   Bell,
} from "lucide-react";

interface UserCardProps {
   user: User;
   rank?: number;
}

const UserCard = ({ user, rank }: UserCardProps) => {
   // Determine background color based on rank
   const getRankColor = (rank: number) => {
      switch (rank) {
         case 1:
            return "bg-gradient-to-r from-yellow-400 to-yellow-500"; // Gold
         case 2:
            return "bg-gradient-to-r from-gray-300 to-gray-400"; // Silver
         case 3:
            return "bg-gradient-to-r from-amber-600 to-amber-700"; // Bronze
         default:
            return "bg-gradient-to-r from-blue-500 to-blue-600"; // Blue
      }
   };

   // Get rank emoji
   const getRankEmoji = (rank: number) => {
      switch (rank) {
         case 1:
            return "🥇";
         case 2:
            return "🥈";
         case 3:
            return "🥉";
         default:
            return rank;
      }
   };

   return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 animate-fadeIn">
         <div className="flex items-start">
            {rank && (
               <div
                  className={`${getRankColor(
                     rank
                  )} w-16 h-full text-white font-bold p-4 flex flex-col items-center justify-center relative overflow-hidden`}
               >
                  <div className="absolute inset-0 opacity-20">
                     {[...Array(5)].map((_, i) => (
                        <div
                           key={i}
                           className="absolute rounded-full bg-white"
                           style={{
                              width: `${Math.random() * 20 + 5}px`,
                              height: `${Math.random() * 20 + 5}px`,
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              opacity: Math.random() * 0.5 + 0.2,
                           }}
                        ></div>
                     ))}
                  </div>
                  <span className="text-2xl mb-1 relative animate-pulse">
                     {getRankEmoji(rank)}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-bold relative">
                     Rank
                  </span>
               </div>
            )}
            <div className="flex-1 p-4">
               <div className="flex items-center">
                  <div className="relative">
                     <div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"
                        style={{ padding: "3px", transform: "scale(1.1)" }}
                     ></div>
                     <Image
                        src={user.profileImage}
                        alt={user.fullName}
                        width={60}
                        height={60}
                        className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm relative z-10"
                     />
                     {rank === 1 && (
                        <div className="absolute -top-1 -right-1 z-20">
                           <Award className="h-6 w-6 text-yellow-500 fill-yellow-500 drop-shadow-md" />
                        </div>
                     )}
                  </div>
                  <div className="ml-4 flex-1">
                     <div className="flex items-center">
                        <h3 className="text-lg font-bold text-gray-900">
                           {user.fullName}
                        </h3>
                        {rank && rank <= 3 && (
                           <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                        )}
                     </div>
                     <p className="text-sm text-gray-500 flex items-center">
                        <span className="text-blue-500 mr-1">@</span>
                        {user.username}
                     </p>
                     <p className="text-xs text-gray-400 mt-1 flex items-center">
                        <Mail className="h-3 w-3 mr-1 inline" />
                        {user.email}
                     </p>
                  </div>
                  <div className="flex flex-col items-end">
                     <div className="bg-blue-50 px-3 py-1 rounded-full mb-2">
                        <span className="text-sm font-semibold text-blue-700 flex items-center">
                           <FileText className="h-3 w-3 text-blue-600 mr-1" />
                           {user.postCount} posts
                        </span>
                     </div>
                     <div className="text-xs text-gray-500">
                        Member since{" "}
                        {new Date().getFullYear() -
                           Math.floor(Math.random() * 5 + 1)}
                     </div>
                  </div>
               </div>

               <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="flex space-x-2">
                     <button className="flex items-center text-xs bg-gray-100 hover:bg-gray-200 transition-colors px-2 py-1 rounded text-gray-700">
                        <Users className="h-3 w-3 mr-1" />
                        <span>Follow</span>
                     </button>
                     <button className="flex items-center text-xs bg-gray-100 hover:bg-gray-200 transition-colors px-2 py-1 rounded text-gray-700">
                        <Bookmark className="h-3 w-3 mr-1" />
                        <span>Save</span>
                     </button>
                  </div>

                  <div className="flex space-x-2">
                     <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100 relative group">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 border border-white"></span>
                        <span className="absolute -bottom-8 right-0 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           Get notified
                        </span>
                     </button>
                     <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100 relative group">
                        <ExternalLink className="h-5 w-5" />
                        <span className="absolute -bottom-8 right-0 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                           View profile
                        </span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserCard;
