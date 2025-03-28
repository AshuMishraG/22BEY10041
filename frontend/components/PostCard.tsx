"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Post, Comment, getPostComments } from "@/services/apiService";
import {
   MessageCircle,
   Heart,
   Calendar,
   Share2,
   Bookmark,
   Award,
   TrendingUp,
   Send,
   ThumbsUp,
   Sparkles,
   ChevronDown,
   ChevronUp,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
   post: Post;
   isTrending?: boolean;
}

const PostCard = ({ post, isTrending }: PostCardProps) => {
   const [comments, setComments] = useState<Comment[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [showComments, setShowComments] = useState(false);
   const [liked, setLiked] = useState(false);
   const [saved, setSaved] = useState(false);
   const [newComment, setNewComment] = useState("");

   // Mock comments if API fails
   const MOCK_COMMENTS: Comment[] = [
      {
         id: 1,
         postId: post.id,
         userId: 101,
         content: "This is really insightful! Thanks for sharing.",
         createdAt: new Date().toISOString(),
         user: {
            id: 101,
            username: "tech_enthusiast",
            fullName: "Alex Johnson",
            profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
         },
      },
      {
         id: 2,
         postId: post.id,
         userId: 102,
         content:
            "I've been looking for information on this topic. Very helpful!",
         createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
         user: {
            id: 102,
            username: "digital_nomad",
            fullName: "Sophia Chen",
            profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
         },
      },
   ];

   const fetchComments = useCallback(async () => {
      // Only fetch comments if they're being shown
      if (!showComments && comments.length === 0) {
         return;
      }

      try {
         setLoading(true);
         setError(null);
         const data = await getPostComments(post.id);
         setComments(data);
      } catch (err) {
         console.error("Error fetching comments:", err);
         setError("Failed to load comments");
         // Use mock comments when API fails
         setComments(MOCK_COMMENTS);
      } finally {
         setLoading(false);
      }
   }, [post.id, showComments, comments.length, MOCK_COMMENTS]);

   const toggleComments = () => {
      setShowComments(!showComments);
      if (!comments.length && !showComments) {
         fetchComments();
      }
   };

   const toggleLike = () => {
      setLiked(!liked);
   };

   const toggleSave = () => {
      setSaved(!saved);
   };

   const handleAddComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.trim()) return;

      // Add new comment to the list
      const newCommentObj: Comment = {
         id: comments.length + 100,
         postId: post.id,
         userId: 999,
         content: newComment,
         createdAt: new Date().toISOString(),
         user: {
            id: 999,
            username: "current_user",
            fullName: "Current User",
            profileImage: "https://randomuser.me/api/portraits/women/9.jpg",
         },
      };

      setComments([newCommentObj, ...comments]);
      setNewComment("");
   };

   useEffect(() => {
      // Don't fetch comments on mount - wait for user to click
      if (isTrending) {
         fetchComments();
      }
   }, [isTrending, fetchComments]);

   if (!post.user) return null;

   const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
      addSuffix: true,
   });

   return (
      <div
         className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 animate-fadeIn ${
            isTrending ? "border-2 border-blue-500" : ""
         }`}
      >
         {isTrending && (
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-1.5 text-sm font-medium rounded-t-lg flex items-center justify-center">
               <TrendingUp className="h-4 w-4 mr-1.5" />
               <span>Trending Post</span>
               <Sparkles className="h-4 w-4 ml-1.5 animate-pulse" />
            </div>
         )}
         <div className="p-5">
            <div className="flex items-center mb-4">
               <div className="flex-shrink-0">
                  <div className="relative">
                     <Image
                        src={post.user.profileImage}
                        alt={post.user.fullName}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover border-2 border-gray-100 hover:border-blue-300 transition-colors"
                     />
                     {isTrending && (
                        <div className="absolute -bottom-1 -right-1">
                           <Award className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        </div>
                     )}
                  </div>
               </div>
               <div className="ml-3 flex-1">
                  <h3 className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                     {post.user.fullName}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center">
                     <span className="text-blue-500">
                        @{post.user.username}
                     </span>{" "}
                     ·
                     <span className="flex items-center ml-1 text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formattedDate}
                     </span>
                  </p>
               </div>
               <button
                  onClick={toggleSave}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-100"
               >
                  <Bookmark
                     className={`h-5 w-5 ${
                        saved ? "text-blue-600 fill-blue-600" : ""
                     }`}
                  />
               </button>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
               {post.title}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

            {post.image && (
               <div className="relative w-full h-60 mb-4 rounded-lg overflow-hidden shadow-inner group">
                  <Image
                     src={post.image}
                     alt={post.title}
                     fill
                     className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="absolute bottom-3 left-3 text-white flex space-x-2">
                        <button className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/30 transition-colors">
                           <Heart className="h-4 w-4" />
                        </button>
                        <button className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/30 transition-colors">
                           <Share2 className="h-4 w-4" />
                        </button>
                     </div>
                  </div>
               </div>
            )}

            <div className="flex justify-between text-gray-600 pt-3 border-t">
               <button
                  onClick={toggleComments}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
               >
                  <MessageCircle
                     className={`h-5 w-5 mr-1.5 group-hover:scale-110 transition-transform ${
                        showComments ? "text-blue-600" : "text-blue-500"
                     }`}
                  />
                  <span
                     className={`text-sm font-medium ${
                        showComments ? "text-blue-600" : ""
                     }`}
                  >
                     {post.commentCount} comments
                  </span>
               </button>
               <button
                  onClick={toggleLike}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group"
               >
                  <Heart
                     className={`h-5 w-5 mr-1.5 group-hover:scale-110 transition-transform ${
                        liked ? "text-red-600 fill-red-600" : "text-red-500"
                     }`}
                  />
                  <span
                     className={`text-sm font-medium ${
                        liked ? "text-red-600" : ""
                     }`}
                  >
                     {liked ? post.likeCount + 1 : post.likeCount} likes
                  </span>
               </button>
               <button className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors group">
                  <Share2 className="h-5 w-5 mr-1.5 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Share</span>
               </button>
            </div>

            {showComments && (
               <div className="mt-4 pt-3 border-t border-gray-100 animate-fadeIn">
                  <div className="flex items-center justify-between mb-3">
                     <h4 className="font-medium">
                        Comments ({comments.length})
                     </h4>
                     <button
                        onClick={toggleComments}
                        className="text-gray-500 hover:text-blue-600 transition-colors text-sm flex items-center"
                     >
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide
                     </button>
                  </div>

                  <form
                     onSubmit={handleAddComment}
                     className="mb-4 flex items-center space-x-2"
                  >
                     <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                        <Image
                           src="https://randomuser.me/api/portraits/women/9.jpg"
                           alt="Your Profile"
                           width={32}
                           height={32}
                           className="h-8 w-8 rounded-full"
                        />
                     </div>
                     <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 border border-gray-200 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                     />
                     <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                     >
                        <Send className="h-4 w-4" />
                     </button>
                  </form>

                  {loading && (
                     <div className="flex items-center justify-center p-4 text-gray-500">
                        <div className="animate-spin h-5 w-5 mr-2 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        <span>Loading comments...</span>
                     </div>
                  )}
                  {error && (
                     <div className="text-sm bg-red-50 text-red-600 py-2 px-3 rounded-md mb-3 flex items-center">
                        <span className="mr-2">⚠️</span>
                        {error}
                     </div>
                  )}
                  {!loading && !error && (
                     <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                        {comments.map((comment) => (
                           <div
                              key={comment.id}
                              className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                           >
                              <div className="flex items-center mb-1">
                                 {comment.user && (
                                    <Image
                                       src={
                                          comment.user.profileImage ||
                                          "https://ui-avatars.com/api/?name=Anonymous&background=random"
                                       }
                                       alt={
                                          comment.user.username || "Anonymous"
                                       }
                                       width={24}
                                       height={24}
                                       className="h-6 w-6 rounded-full mr-2"
                                    />
                                 )}
                                 <span className="font-medium text-sm text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
                                    {comment.user?.username || "Anonymous"}
                                 </span>
                                 <span className="text-xs text-gray-500 ml-2">
                                    {formatDistanceToNow(
                                       new Date(comment.createdAt),
                                       { addSuffix: true }
                                    )}
                                 </span>
                              </div>
                              <div className="flex items-start">
                                 <p className="text-sm text-gray-700 ml-8 flex-1">
                                    {comment.content}
                                 </p>
                                 <button className="text-gray-400 hover:text-blue-500 transition-colors p-1">
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                 </button>
                              </div>
                           </div>
                        ))}
                        {comments.length === 0 && (
                           <div className="text-center py-8 text-gray-500">
                              <MessageCircle className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                              <p className="text-sm">
                                 No comments yet. Be the first to comment!
                              </p>
                           </div>
                        )}
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default PostCard;
