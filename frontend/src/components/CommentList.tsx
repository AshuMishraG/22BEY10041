"use client";

import { Comment } from "@/services/api";

interface CommentListProps {
   comments: Comment[];
   loading?: boolean;
}

export default function CommentList({
   comments,
   loading = false,
}: CommentListProps) {
   if (loading) {
      return (
         <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
         </div>
      );
   }

   if (comments.length === 0) {
      return (
         <div className="alert alert-info">
            No comments found for this post.
         </div>
      );
   }

   return (
      <div className="comment-list">
         <h4 className="mb-4">Comments ({comments.length})</h4>
         {comments.map((comment) => (
            <div key={comment.id} className="card mb-3">
               <div className="card-header bg-light d-flex justify-content-between">
                  <span className="fw-bold">{comment.name}</span>
                  <small>{comment.email}</small>
               </div>
               <div className="card-body">
                  <p className="card-text">{comment.body}</p>
               </div>
            </div>
         ))}
      </div>
   );
}
