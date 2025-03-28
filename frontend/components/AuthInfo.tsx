"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import {
   ClipboardCopy,
   Check,
   ShieldCheck,
   ShieldAlert,
   RefreshCcw,
   Clock,
   Building,
   Fingerprint,
   User,
   Mail,
   IdCard,
   Lock,
   ExternalLink,
} from "lucide-react";

interface UserInfoRowProps {
   label: string;
   value: string;
   truncate?: boolean;
   icon: React.ReactNode;
}

const UserInfoRow = ({ label, value, truncate, icon }: UserInfoRowProps) => (
   <div className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
      <div className="text-gray-400 mr-3">{icon}</div>
      <span className="text-gray-600 mr-2">{label}:</span>
      <span className="font-medium text-gray-800 ml-auto">
         {!value ? (
            <span className="text-gray-400 italic">Not available</span>
         ) : truncate ? (
            `${value.substring(0, 8)}...`
         ) : (
            value
         )}
      </span>
   </div>
);

const AuthInfo = () => {
   const [copied, setCopied] = useState(false);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [isExpanded, setIsExpanded] = useState(false);
   const { isAuthenticated, userInfo, token, refreshAuth } = useAuth();

   const handleCopyClick = useCallback(() => {
      if (token) {
         navigator.clipboard.writeText(token);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   }, [token]);

   const handleRefreshAuth = useCallback(async () => {
      setIsRefreshing(true);
      try {
         await refreshAuth();
      } catch (error) {
         console.error("Failed to refresh authentication:", error);
      } finally {
         setIsRefreshing(false);
      }
   }, [refreshAuth]);

   const toggleExpand = () => {
      setIsExpanded(!isExpanded);
   };

   if (!userInfo) {
      return (
         <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center border border-red-100 animate-fadeIn">
            <div className="mb-4 flex justify-center">
               <div className="relative">
                  <div
                     className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"
                     style={{ padding: "8px" }}
                  ></div>
                  <ShieldAlert className="h-12 w-12 text-red-500 relative" />
               </div>
            </div>
            <div className="text-red-600 font-medium text-lg mb-2">
               Authentication information unavailable
            </div>
            <p className="text-gray-600 mb-4">
               Your session may have expired or there could be an issue with the
               authentication service.
            </p>
            <button
               onClick={handleRefreshAuth}
               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center mx-auto transition-colors shadow-sm hover:shadow"
               disabled={isRefreshing}
            >
               {isRefreshing ? (
                  <>
                     <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
                     Refreshing...
                  </>
               ) : (
                  <>
                     <RefreshCcw className="h-4 w-4 mr-2" />
                     Refresh Authentication
                  </>
               )}
            </button>
         </div>
      );
   }

   return (
      <div className="bg-white rounded-lg shadow-md p-5 mb-6 border border-gray-100 transition-all duration-300 animate-fadeIn hover:shadow-lg">
         <div className="flex items-center mb-3">
            <div className="bg-gray-50 p-2 rounded-md mr-3">
               {isAuthenticated ? (
                  <ShieldCheck className="h-5 w-5 text-green-500" />
               ) : (
                  <ShieldAlert className="h-5 w-5 text-red-500" />
               )}
            </div>
            <div>
               <h3 className="font-semibold text-gray-800">
                  Authentication Status
               </h3>
               <p className="text-xs text-gray-500">
                  {isAuthenticated
                     ? "Your session is active and secure"
                     : "Your session has expired or is invalid"}
               </p>
            </div>
            <div className="ml-auto flex flex-col items-end">
               <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                     isAuthenticated
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
               >
                  {isAuthenticated ? "Valid" : "Expired"}
               </span>
               <span className="text-xs text-gray-400 mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Updated: {new Date().toLocaleTimeString()}
               </span>
            </div>
         </div>

         <div
            className={`overflow-hidden transition-all duration-300 ${
               isExpanded ? "max-h-96" : "max-h-32"
            }`}
         >
            <div className="p-3 bg-gray-50 rounded-lg mb-3">
               <div className="space-y-1 text-sm">
                  <UserInfoRow
                     label="Company"
                     value={userInfo.companyName || ""}
                     icon={<Building className="h-4 w-4" />}
                  />
                  <UserInfoRow
                     label="Client ID"
                     value={userInfo.clientID || ""}
                     truncate
                     icon={<Fingerprint className="h-4 w-4" />}
                  />
                  <UserInfoRow
                     label="Owner"
                     value={userInfo.ownerName || ""}
                     icon={<User className="h-4 w-4" />}
                  />
                  <UserInfoRow
                     label="Email"
                     value={userInfo.ownerEmail || ""}
                     icon={<Mail className="h-4 w-4" />}
                  />
                  <UserInfoRow
                     label="Roll No"
                     value={userInfo.rollNo || ""}
                     icon={<IdCard className="h-4 w-4" />}
                  />
               </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
               <div className="flex items-center mb-1">
                  <Lock className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">
                     Access Token
                  </span>
                  <button className="ml-auto text-blue-700 text-xs hover:underline flex items-center">
                     <ExternalLink className="h-3 w-3 mr-1" /> View Docs
                  </button>
               </div>
               <div className="flex items-center bg-white rounded p-2 text-xs text-gray-600 break-all border border-blue-100">
                  <code className="truncate flex-1">
                     {token || "Not available"}
                  </code>
                  {token ? (
                     <button
                        onClick={handleCopyClick}
                        className="ml-2 p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50 flex-shrink-0"
                        title="Copy token"
                     >
                        {copied ? (
                           <Check className="h-4 w-4 text-green-500" />
                        ) : (
                           <ClipboardCopy className="h-4 w-4" />
                        )}
                     </button>
                  ) : (
                     <button
                        onClick={handleRefreshAuth}
                        className="ml-2 p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50 flex-shrink-0"
                        title="Refresh token"
                        disabled={isRefreshing}
                     >
                        <RefreshCcw
                           className={`h-4 w-4 ${
                              isRefreshing ? "animate-spin" : ""
                           }`}
                        />
                     </button>
                  )}
               </div>
            </div>
         </div>

         <button
            onClick={toggleExpand}
            className="w-full mt-3 pt-2 text-center text-sm text-gray-500 hover:text-blue-600 transition-colors border-t border-gray-100"
         >
            {isExpanded ? "Show Less" : "Show More"}
         </button>

         {!isAuthenticated && (
            <div className="mt-3 flex justify-center">
               <button
                  onClick={handleRefreshAuth}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center transition-colors"
                  disabled={isRefreshing}
               >
                  {isRefreshing ? (
                     <>
                        <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
                        Refreshing...
                     </>
                  ) : (
                     <>
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Refresh Authentication
                     </>
                  )}
               </button>
            </div>
         )}
      </div>
   );
};

export default AuthInfo;
