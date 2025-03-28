"use client";

import { AlertTriangle, RefreshCw, HelpCircle } from "lucide-react";

interface ErrorStateProps {
   message?: string;
   onRetry?: () => void;
}

const ErrorState = ({
   message = "Something went wrong. Please try again later.",
   onRetry,
}: ErrorStateProps) => {
   return (
      <div className="bg-white rounded-lg shadow-sm p-6 my-4 animate-fadeIn">
         <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
               <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
               </div>
            </div>
            <div className="flex-grow text-center md:text-left">
               <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Error Encountered
               </h3>
               <p className="text-gray-600 mb-4">{message}</p>
               <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {onRetry && (
                     <button
                        onClick={onRetry}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                     >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                     </button>
                  )}
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                     <HelpCircle className="h-4 w-4 mr-2" />
                     Get Help
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ErrorState;
