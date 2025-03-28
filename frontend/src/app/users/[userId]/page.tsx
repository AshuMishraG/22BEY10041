"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { User, Post, getUsers, getUserPosts } from "@/services/api";

export default function UserDetailPage() {
   const { userId } = useParams();
   const [user, setUser] = useState<User | null>(null);
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchUserAndPosts = async () => {
         try {
            setLoading(true);
            // Fetch all users to find the specific one
            const allUsers = await getUsers();
            const currentUser = allUsers.find((u) => u.id === Number(userId));

            if (!currentUser) {
               setError("User not found");
               return;
            }

            setUser(currentUser);

            // Fetch user posts
            const userPosts = await getUserPosts(Number(userId));
            setPosts(userPosts);
         } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Failed to load user data. Please try again later.");
         } finally {
            setLoading(false);
         }
      };

      if (userId) {
         fetchUserAndPosts();
      }
   }, [userId]);

   return (
      <main>
         <Navbar />
         <div className="container py-5">
            <div className="mb-4">
               <Link href="/users" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i> Back to Users
               </Link>
            </div>

            {loading ? (
               <div className="text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </div>
               </div>
            ) : error ? (
               <div className="alert alert-danger">{error}</div>
            ) : user ? (
               <>
                  <div className="card mb-4">
                     <div className="card-body">
                        <h1 className="card-title mb-3">{user.name}</h1>
                        <div className="row">
                           <div className="col-md-6">
                              <p>
                                 <strong>Username:</strong> {user.username}
                              </p>
                              <p>
                                 <strong>Email:</strong> {user.email}
                              </p>
                              {user.phone && (
                                 <p>
                                    <strong>Phone:</strong> {user.phone}
                                 </p>
                              )}
                              {user.website && (
                                 <p>
                                    <strong>Website:</strong> {user.website}
                                 </p>
                              )}
                           </div>
                           {user.company && (
                              <div className="col-md-6">
                                 <p>
                                    <strong>Company:</strong>{" "}
                                    {user.company.name}
                                 </p>
                                 <p>
                                    <em>{user.company.catchPhrase}</em>
                                 </p>
                                 <p>{user.company.bs}</p>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>

                  <h2 className="mb-4">Posts by {user.name}</h2>
                  {posts.length > 0 ? (
                     <div className="row">
                        {posts.map((post) => (
                           <div key={post.id} className="col-lg-6 mb-4">
                              <PostCard post={post} />
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div className="alert alert-info">
                        No posts found for this user.
                     </div>
                  )}
               </>
            ) : (
               <div className="alert alert-warning">User not found</div>
            )}
         </div>
      </main>
   );
}
