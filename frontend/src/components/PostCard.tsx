"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/services/api";

interface PostCardProps {
   post: Post;
}

export default function PostCard({ post }: PostCardProps) {
   const [expanded, setExpanded] = useState(false);

   return (
      <div className="card mb-4">
         <div className="card-header">
            <h5 className="card-title">{post.title}</h5>
         </div>
         <div className="card-body">
            <p className="card-text">
               {expanded
                  ? post.body
                  : `${post.body.substring(0, 100)}${
                       post.body.length > 100 ? "..." : ""
                    }`}
            </p>
            {post.body.length > 100 && (
               <button
                  className="btn btn-sm btn-link p-0"
                  onClick={() => setExpanded(!expanded)}
               >
                  {expanded ? "Show Less" : "Read More"}
               </button>
            )}
         </div>
         <div className="card-footer d-flex justify-content-between">
            <small className="text-muted">Post ID: {post.id}</small>
            <Link href={`/posts/${post.id}`} className="btn btn-sm btn-primary">
               View Comments
            </Link>
         </div>
      </div>
   );
}
