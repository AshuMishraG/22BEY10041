"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@/services/api";

interface UserCardProps {
   user: User;
}

export default function UserCard({ user }: UserCardProps) {
   const [expanded, setExpanded] = useState(false);

   return (
      <div className="card mb-4">
         <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{user.name}</h5>
            <button
               className="btn btn-sm btn-outline-primary"
               onClick={() => setExpanded(!expanded)}
            >
               {expanded ? "Less" : "More"} Info
            </button>
         </div>
         <div className="card-body">
            <p>
               <strong>Username:</strong> {user.username}
            </p>
            <p>
               <strong>Email:</strong> {user.email}
            </p>

            {expanded && (
               <div className="mt-3">
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
                  {user.company && (
                     <div>
                        <p>
                           <strong>Company:</strong> {user.company.name}
                        </p>
                        <p>
                           <em>{user.company.catchPhrase}</em>
                        </p>
                     </div>
                  )}
                  {user.address && (
                     <div>
                        <p>
                           <strong>Address:</strong>
                        </p>
                        <p>
                           {user.address.street}, {user.address.suite}
                           <br />
                           {user.address.city}, {user.address.zipcode}
                        </p>
                     </div>
                  )}
               </div>
            )}
         </div>
         <div className="card-footer">
            <Link href={`/users/${user.id}`} className="btn btn-primary">
               View Posts
            </Link>
         </div>
      </div>
   );
}
