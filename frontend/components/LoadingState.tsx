"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
   message?: string;
}

const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
   return (
      <div className="flex flex-col items-center justify-center h-[70vh] animate-fadeIn">
         <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-100 flex items-center justify-center mb-6 animate-pulse-blue">
               <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
            <div className="absolute w-24 h-24 rounded-full border border-blue-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-75"></div>
         </div>
         <p className="text-lg font-medium text-gray-600 mb-2">{message}</p>
         <p className="text-sm text-gray-500">
            This may take a moment. Please wait...
         </p>

         <div className="mt-8 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-loading-bar"></div>
         </div>
      </div>
   );
};

export default LoadingState;
