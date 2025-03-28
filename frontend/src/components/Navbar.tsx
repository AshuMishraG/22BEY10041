"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
   const pathname = usePathname();

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
         <div className="container">
            <Link href="/" className="navbar-brand">
               Social Media Analytics
            </Link>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarNav"
               aria-controls="navbarNav"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                     <Link
                        href="/"
                        className={`nav-link ${
                           pathname === "/" ? "active" : ""
                        }`}
                     >
                        Dashboard
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link
                        href="/users"
                        className={`nav-link ${
                           pathname === "/users" ? "active" : ""
                        }`}
                     >
                        Users
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link
                        href="/posts"
                        className={`nav-link ${
                           pathname === "/posts" ? "active" : ""
                        }`}
                     >
                        Posts
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link
                        href="/analytics"
                        className={`nav-link ${
                           pathname === "/analytics" ? "active" : ""
                        }`}
                     >
                        Analytics
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}
