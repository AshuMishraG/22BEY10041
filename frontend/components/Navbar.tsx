"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
   BarChart3,
   Users,
   List,
   X,
   Menu,
   Home,
   Activity,
   Search,
   Bell,
   ChevronDown,
   Settings,
   HelpCircle,
   LogOut,
} from "lucide-react";

const navLinks = [
   { href: "/", label: "Feed", icon: <Home className="h-5 w-5" /> },
   {
      href: "/top-users",
      label: "Top Users",
      icon: <Users className="h-5 w-5" />,
   },
   {
      href: "/trending",
      label: "Trending",
      icon: <Activity className="h-5 w-5" />,
   },
];

const Navbar = () => {
   const pathname = usePathname();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);
   const [notificationCount, setNotificationCount] = useState(3);
   const [userMenuOpen, setUserMenuOpen] = useState(false);

   const toggleMenu = useCallback(() => {
      setIsMenuOpen((prev) => !prev);
   }, []);

   const toggleUserMenu = useCallback(() => {
      setUserMenuOpen((prev) => !prev);
   }, []);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 10) {
            setScrolled(true);
         } else {
            setScrolled(false);
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <nav
         className={`bg-white border-b sticky top-0 z-10 transition-all duration-300 ${
            scrolled ? "shadow-md" : "shadow-sm"
         }`}
      >
         <div className="container mx-auto px-4">
            <div className="flex justify-between h-16">
               <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                     <Link
                        href="/"
                        className="flex items-center text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                     >
                        <div className="relative group">
                           <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-70 group-hover:opacity-100 blur group-hover:blur-md transition duration-1000"></div>
                           <div className="relative">
                              <BarChart3 className="h-7 w-7 text-blue-600 group-hover:text-blue-500 transition-all" />
                           </div>
                        </div>
                        <span className="hidden md:inline ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
                           Social Analytics
                        </span>
                        <span className="md:hidden ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-extrabold">
                           Analytics
                        </span>
                     </Link>
                  </div>

                  <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
                     {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                           <Link
                              key={link.href}
                              href={link.href}
                              className={`${
                                 isActive
                                    ? "text-blue-600"
                                    : "text-gray-500 hover:text-gray-700"
                              } group flex flex-col items-center justify-center px-4 pt-2 font-medium transition-all duration-200 relative`}
                           >
                              <div
                                 className={`p-1.5 rounded-full ${
                                    isActive
                                       ? "bg-blue-50 text-blue-600"
                                       : "group-hover:bg-gray-50 text-gray-500 group-hover:text-gray-700"
                                 } transition-colors duration-200`}
                              >
                                 {link.icon}
                              </div>
                              <span className="text-xs mt-1">{link.label}</span>
                              {isActive && (
                                 <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 animate-fadeIn"></div>
                              )}
                           </Link>
                        );
                     })}
                  </div>
               </div>

               <div className="flex items-center space-x-3">
                  <div className="relative hidden md:block">
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Search className="h-4 w-4" />
                     </div>
                     <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full py-2 pl-10 pr-4 focus:ring-blue-500 focus:border-blue-500 w-56 transition-all focus:w-64"
                     />
                  </div>

                  <div className="relative">
                     <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-gray-50 relative">
                        <Bell className="h-5 w-5" />
                        {notificationCount > 0 && (
                           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                              {notificationCount}
                           </span>
                        )}
                     </button>
                  </div>

                  <div className="hidden sm:block relative">
                     <button
                        onClick={toggleUserMenu}
                        className="flex items-center space-x-2 rounded-full hover:bg-gray-50 py-1 pl-2 pr-3 transition-colors"
                     >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                           U
                        </div>
                        <div className="hidden md:block text-left">
                           <div className="text-sm font-semibold text-gray-800">
                              User
                           </div>
                           <div className="text-xs text-gray-500">
                              Analytics
                           </div>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                     </button>

                     {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-20 animate-fadeIn">
                           <div className="px-4 py-2 border-b border-gray-100">
                              <div className="font-medium text-gray-800">
                                 User Account
                              </div>
                              <div className="text-xs text-gray-500">
                                 user@example.com
                              </div>
                           </div>
                           <div className="pt-2">
                              <a
                                 href="#"
                                 className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                 <Settings className="h-4 w-4 mr-3 text-gray-500" />
                                 Settings
                              </a>
                              <a
                                 href="#"
                                 className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                 <HelpCircle className="h-4 w-4 mr-3 text-gray-500" />
                                 Help & Support
                              </a>
                              <a
                                 href="#"
                                 className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-50 border-t border-gray-100 mt-2"
                              >
                                 <LogOut className="h-4 w-4 mr-3" />
                                 Sign out
                              </a>
                           </div>
                        </div>
                     )}
                  </div>

                  <button className="ml-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors hidden sm:flex items-center text-sm font-medium shadow-sm hover:shadow">
                     <BarChart3 className="h-4 w-4 mr-1.5" />
                     New Analysis
                  </button>

                  <div className="flex items-center sm:hidden">
                     <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        aria-controls="mobile-menu"
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                     >
                        <span className="sr-only">Toggle menu</span>
                        {isMenuOpen ? (
                           <X className="h-6 w-6" />
                        ) : (
                           <Menu className="h-6 w-6" />
                        )}
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {isMenuOpen && (
            <div
               className="sm:hidden absolute w-full bg-white shadow-lg animate-slideIn"
               id="mobile-menu"
            >
               <div className="pt-2 pb-3 space-y-1">
                  {navLinks.map((link) => {
                     const isActive = pathname === link.href;
                     return (
                        <Link
                           key={link.href}
                           href={link.href}
                           className={`${
                              isActive
                                 ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700"
                                 : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                           } block pl-4 pr-4 py-2 text-base font-medium transition-colors duration-200`}
                           onClick={toggleMenu}
                        >
                           <div className="flex items-center">
                              <div
                                 className={`p-1 rounded-full ${
                                    isActive ? "bg-blue-100" : ""
                                 }`}
                              >
                                 {link.icon}
                              </div>
                              <span className="ml-3">{link.label}</span>
                           </div>
                        </Link>
                     );
                  })}
                  <div className="px-5 pt-4 pb-2">
                     <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                           <Search className="h-4 w-4" />
                        </div>
                        <input
                           type="text"
                           placeholder="Search"
                           className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full py-2 pl-10 pr-4 w-full focus:ring-blue-500 focus:border-blue-500"
                        />
                     </div>
                     <button className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center text-base font-medium shadow-sm">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        New Analysis
                     </button>
                  </div>
               </div>
            </div>
         )}
      </nav>
   );
};

export default Navbar;
