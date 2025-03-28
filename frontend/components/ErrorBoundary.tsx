"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
   children: ReactNode;
}

interface State {
   hasError: boolean;
   error: Error | null;
}

const ErrorFallback = ({ onReset }: { onReset: () => void }) => (
   <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
         <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
         </h2>
         <p className="text-gray-600 mb-4">
            An error occurred while rendering this page.
         </p>
         <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onReset}
         >
            Try again
         </button>
      </div>
   </div>
);

export default class ErrorBoundary extends Component<Props, State> {
   public state: State = {
      hasError: false,
      error: null,
   };

   public static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error };
   }

   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error("Uncaught error:", error, errorInfo);
   }

   private handleReset = () => {
      this.setState({ hasError: false, error: null });
      window.location.reload();
   };

   public render() {
      return this.state.hasError ? (
         <ErrorFallback onReset={this.handleReset} />
      ) : (
         this.props.children
      );
   }
}
