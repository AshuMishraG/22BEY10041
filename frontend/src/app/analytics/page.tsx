"use client";

import { useState, useEffect } from "react";
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   PointElement,
   LineElement,
   Title,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import Navbar from "@/components/Navbar";
import {
   User,
   Post,
   Comment,
   getUsers,
   getUserPosts,
   getPostComments,
} from "@/services/api";

// Register ChartJS components
ChartJS.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   PointElement,
   LineElement,
   Title
);

export default function AnalyticsPage() {
   const [loading, setLoading] = useState(true);
   const [analyticsData, setAnalyticsData] = useState({
      userPostCounts: [] as { userName: string; postCount: number }[],
      postCommentCounts: [] as { postTitle: string; commentCount: number }[],
      postsByUser: [] as number[],
      commentsByPost: [] as number[],
   });

   useEffect(() => {
      const fetchAnalyticsData = async () => {
         try {
            setLoading(true);
            // Fetch users
            const users = await getUsers();
            const limitedUsers = users.slice(0, 5);

            // Get post counts for each user
            const userPostData = await Promise.all(
               limitedUsers.map(async (user) => {
                  const posts = await getUserPosts(user.id);
                  return {
                     userName: user.name,
                     postCount: posts.length,
                  };
               })
            );

            // Get comment counts for some posts
            let allPosts: Post[] = [];
            for (const user of limitedUsers.slice(0, 2)) {
               const posts = await getUserPosts(user.id);
               allPosts = [...allPosts, ...posts];
            }

            const limitedPosts = allPosts.slice(0, 5);
            const postCommentData = await Promise.all(
               limitedPosts.map(async (post) => {
                  const comments = await getPostComments(post.id);
                  return {
                     postTitle: post.title.substring(0, 20) + "...",
                     commentCount: comments.length,
                  };
               })
            );

            setAnalyticsData({
               userPostCounts: userPostData,
               postCommentCounts: postCommentData,
               postsByUser: userPostData.map((item) => item.postCount),
               commentsByPost: postCommentData.map((item) => item.commentCount),
            });
         } catch (error) {
            console.error("Error fetching analytics data:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchAnalyticsData();
   }, []);

   // Prepare chart data
   const pieData = {
      labels: analyticsData.userPostCounts.map((item) => item.userName),
      datasets: [
         {
            label: "Posts per User",
            data: analyticsData.postsByUser,
            backgroundColor: [
               "rgba(255, 99, 132, 0.6)",
               "rgba(54, 162, 235, 0.6)",
               "rgba(255, 206, 86, 0.6)",
               "rgba(75, 192, 192, 0.6)",
               "rgba(153, 102, 255, 0.6)",
            ],
            borderColor: [
               "rgba(255, 99, 132, 1)",
               "rgba(54, 162, 235, 1)",
               "rgba(255, 206, 86, 1)",
               "rgba(75, 192, 192, 1)",
               "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
         },
      ],
   };

   const barData = {
      labels: analyticsData.postCommentCounts.map((item) => item.postTitle),
      datasets: [
         {
            label: "Comments per Post",
            data: analyticsData.commentsByPost,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
         },
      ],
   };

   const lineData = {
      labels: analyticsData.userPostCounts.map((item) => item.userName),
      datasets: [
         {
            label: "User Activity (Posts)",
            data: analyticsData.postsByUser,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
         },
      ],
   };

   return (
      <main>
         <Navbar />
         <div className="container py-5">
            <h1 className="mb-5">Social Media Analytics</h1>

            {loading ? (
               <div className="text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">Loading...</span>
                  </div>
               </div>
            ) : (
               <div className="row">
                  <div className="col-md-6 mb-4">
                     <div className="card h-100">
                        <div className="card-header bg-light">
                           <h5 className="card-title mb-0">
                              Posts Distribution by User
                           </h5>
                        </div>
                        <div className="card-body">
                           <div
                              style={{
                                 height: "300px",
                                 display: "flex",
                                 justifyContent: "center",
                              }}
                           >
                              <Pie
                                 data={pieData}
                                 options={{ maintainAspectRatio: false }}
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="col-md-6 mb-4">
                     <div className="card h-100">
                        <div className="card-header bg-light">
                           <h5 className="card-title mb-0">
                              Comments per Post
                           </h5>
                        </div>
                        <div className="card-body">
                           <div style={{ height: "300px" }}>
                              <Bar
                                 data={barData}
                                 options={{ maintainAspectRatio: false }}
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="col-md-12 mb-4">
                     <div className="card">
                        <div className="card-header bg-light">
                           <h5 className="card-title mb-0">
                              User Activity Trend
                           </h5>
                        </div>
                        <div className="card-body">
                           <div style={{ height: "300px" }}>
                              <Line
                                 data={lineData}
                                 options={{ maintainAspectRatio: false }}
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="col-md-12">
                     <div className="card">
                        <div className="card-header bg-light">
                           <h5 className="card-title mb-0">Summary</h5>
                        </div>
                        <div className="card-body">
                           <div className="table-responsive">
                              <table className="table table-striped">
                                 <thead>
                                    <tr>
                                       <th>User</th>
                                       <th>Post Count</th>
                                       <th>Activity Level</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {analyticsData.userPostCounts.map(
                                       (item, index) => (
                                          <tr key={index}>
                                             <td>{item.userName}</td>
                                             <td>{item.postCount}</td>
                                             <td>
                                                {item.postCount > 8 ? (
                                                   <span className="badge bg-success">
                                                      High
                                                   </span>
                                                ) : item.postCount > 4 ? (
                                                   <span className="badge bg-warning">
                                                      Medium
                                                   </span>
                                                ) : (
                                                   <span className="badge bg-danger">
                                                      Low
                                                   </span>
                                                )}
                                             </td>
                                          </tr>
                                       )
                                    )}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </main>
   );
}
