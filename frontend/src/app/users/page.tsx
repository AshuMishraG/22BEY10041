"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import UserCard from "@/components/UserCard";
import { User, getUsers } from "@/services/api";

export default function UsersPage() {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
         } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users. Please try again later.");
         } finally {
            setLoading(false);
         }
      };

      fetchUsers();
   }, []);

   return (
      <main>
         <Navbar />
         <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
               <h1>Users</h1>
               <div className="d-flex gap-2">
                  <div className="input-group">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Search users..."
                        aria-label="Search users"
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
                  {users.map((user) => (
                     <div key={user.id} className="col-lg-6">
                        <UserCard user={user} />
                     </div>
                  ))}
                  {users.length === 0 && (
                     <div className="col-12">
                        <div className="alert alert-info">No users found.</div>
                     </div>
                  )}
               </div>
            )}
         </div>
      </main>
   );
}
