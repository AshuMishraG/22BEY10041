"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { User, Post, getUsers, getUserPosts } from "@/services/api";

export default function PostsPage() {
   const [allPosts, setAllPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchAllPosts = async () => {
         try {
            setLoading(true);
            // Fetch all users
            const users = await getUsers();

            // Fetch posts for each user (limit to first 5 users for performance)
            const limitedUsers = users.slice(0, 5);
            const postsPromises = limitedUsers.map((user) =>
               getUserPosts(user.id)
            );
            const postsArrays = await Promise.all(postsPromises);

            // Flatten the array of post arrays
            const posts = postsArrays.flat();

            setAllPosts(posts);
         } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Failed to load posts. Please try again later.");
         } finally {
            setLoading(false);
         }
      };

      fetchAllPosts();
   }, []);

   return (
      <main>
         <Navbar />
         <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
               <h1>All Posts</h1>
               <div className="d-flex gap-2">
                  <div className="input-group">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Search posts..."
                        aria-label="Search posts"
                     />
                     <button
                        className="btn btn-outline-secondary"
                        type="button"
                     >
                        <i className="bi bi-search"></i>
                     </button>
                  </div>
               </div>
            </div>

            {loading ? (
               <div className="text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </div>
               </div>
            ) : error ? (
               <div className="alert alert-danger">{error}</div>
            ) : (
               <div className="row">
                  {allPosts.map((post) => (
                     <div key={post.id} className="col-md-6 mb-4">
                        <PostCard post={post} />
                     </div>
                  ))}
                  {allPosts.length === 0 && (
                     <div className="col-12">
                        <div className="alert alert-info">No posts found.</div>
                     </div>
                  )}
               </div>
            )}
         </div>
      </main>
   );
}
