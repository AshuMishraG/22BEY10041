"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CommentList from "@/components/CommentList";
import {
   Post,
   Comment,
   getUsers,
   getUserPosts,
   getPostComments,
} from "@/services/api";

export default function PostDetailPage() {
   const { postId } = useParams();
   const [post, setPost] = useState<Post | null>(null);
   const [comments, setComments] = useState<Comment[]>([]);
   const [author, setAuthor] = useState<string>("Unknown Author");
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchPostAndComments = async () => {
         try {
            setLoading(true);

            // Fetch all users
            const users = await getUsers();

            // Find the post by trying to fetch posts for each user (limit to first 5 users for performance)
            let foundPost: Post | null = null;
            const limitedUsers = users.slice(0, 5);

            for (const user of limitedUsers) {
               const userPosts = await getUserPosts(user.id);
               const matchingPost = userPosts.find(
                  (p) => p.id === Number(postId)
               );

               if (matchingPost) {
                  foundPost = matchingPost;
                  setAuthor(user.name);
                  break;
               }
            }

            if (!foundPost) {
               setError("Post not found");
               return;
            }

            setPost(foundPost);

            // Fetch comments for the post
            const postComments = await getPostComments(Number(postId));
            setComments(postComments);
         } catch (err) {
            console.error("Error fetching post data:", err);
            setError("Failed to load post data. Please try again later.");
         } finally {
            setLoading(false);
         }
      };

      if (postId) {
         fetchPostAndComments();
      }
   }, [postId]);

   return (
      <main>
         <Navbar />
         <div className="container py-5">
            <div className="mb-4">
               <Link href="/posts" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i> Back to Posts
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
            ) : post ? (
               <>
                  <div className="card mb-5">
                     <div className="card-header bg-primary text-white">
                        <div className="d-flex justify-content-between align-items-center">
                           <h5 className="mb-0">Post #{post.id}</h5>
                           <span>By {author}</span>
                        </div>
                     </div>
                     <div className="card-body">
                        <h1 className="card-title mb-4">{post.title}</h1>
                        <p className="card-text lead">{post.body}</p>
                     </div>
                  </div>

                  <h2 className="mb-4">Comments</h2>
                  <CommentList comments={comments} />
               </>
            ) : (
               <div className="alert alert-warning">Post not found</div>
            )}
         </div>
      </main>
   );
}
