"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/Dashboard/StatCard";
import {
   User,
   Post,
   Comment,
   getUsers,
   getUserPosts,
   getPostComments,
} from "@/services/api";

export default function Home() {
   const [loading, setLoading] = useState(true);
   const [stats, setStats] = useState({
      users: 0,
      posts: 0,
      comments: 0,
      latestPost: null as Post | null,
      mostActiveUser: null as User | null,
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            setLoading(true);
            // Fetch users
            const users = await getUsers();

            // Fetch some posts for initial user
            let posts: Post[] = [];
            if (users.length > 0) {
               posts = await getUserPosts(users[0].id);
            }

            // Fetch some comments for initial post
            let comments: Comment[] = [];
            if (posts.length > 0) {
               comments = await getPostComments(posts[0].id);
            }

            // Find most active user (user with most posts)
            const userPostCounts = await Promise.all(
               users.slice(0, 5).map(async (user) => {
                  const userPosts = await getUserPosts(user.id);
                  return { user, count: userPosts.length };
               })
            );

            const mostActiveUser = userPostCounts.reduce(
               (prev, current) => (prev.count > current.count ? prev : current),
               { user: null, count: 0 }
            ).user;

            // Set stats
            setStats({
               users: users.length,
               posts: posts.length,
               comments: comments.length,
               latestPost: posts.length > 0 ? posts[0] : null,
               mostActiveUser,
            });
         } catch (error) {
            console.error("Error fetching dashboard data:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   return (
      <main>
         <Navbar />
         <div className="container py-5">
            <h1 className="mb-4">Social Media Analytics Dashboard</h1>

            {loading ? (
               <div className="text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </div>
               </div>
            ) : (
               <>
                  <div className="row mb-5">
                     <div className="col-md-4">
                        <StatCard
                           title="Total Users"
                           value={stats.users}
                           icon="bi-people"
                           color="primary"
                        />
                     </div>
                     <div className="col-md-4">
                        <StatCard
                           title="Total Posts"
                           value={stats.posts}
                           icon="bi-file-earmark-text"
                           color="success"
                        />
                     </div>
                     <div className="col-md-4">
                        <StatCard
                           title="Total Comments"
                           value={stats.comments}
                           icon="bi-chat-left-text"
                           color="info"
                        />
                     </div>
                  </div>

                  <div className="row">
                     <div className="col-md-6 mb-4">
                        <div className="card h-100">
                           <div className="card-header">
                              <h5 className="card-title">Latest Post</h5>
                           </div>
                           <div className="card-body">
                              {stats.latestPost ? (
                                 <>
                                    <h6>{stats.latestPost.title}</h6>
                                    <p className="text-muted">
                                       {stats.latestPost.body.substring(0, 150)}
                                       ...
                                    </p>
                                 </>
                              ) : (
                                 <p>No posts available</p>
                              )}
                           </div>
                           <div className="card-footer">
                              <Link
                                 href="/posts"
                                 className="btn btn-sm btn-primary"
                              >
                                 View All Posts
                              </Link>
                           </div>
                        </div>
                     </div>

                     <div className="col-md-6 mb-4">
                        <div className="card h-100">
                           <div className="card-header">
                              <h5 className="card-title">Most Active User</h5>
                           </div>
                           <div className="card-body">
                              {stats.mostActiveUser ? (
                                 <>
                                    <h6>{stats.mostActiveUser.name}</h6>
                                    <p>
                                       <strong>Email:</strong>{" "}
                                       {stats.mostActiveUser.email}
                                    </p>
                                    {stats.mostActiveUser.company && (
                                       <p className="text-muted">
                                          Works at{" "}
                                          {stats.mostActiveUser.company.name}
                                       </p>
                                    )}
                                 </>
                              ) : (
                                 <p>No user data available</p>
                              )}
                           </div>
                           <div className="card-footer">
                              <Link
                                 href="/users"
                                 className="btn btn-sm btn-primary"
                              >
                                 View All Users
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>
      </main>
   );
}
