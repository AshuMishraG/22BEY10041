"use client";

import React, {
   createContext,
   useContext,
   ReactNode,
   useState,
   useEffect,
} from "react";
import { APP_CONFIG } from "@/config/appConfig";
import { authenticate } from "@/services/apiService";

interface UserInfo {
   companyName: string;
   clientID: string;
   ownerName: string;
   ownerEmail: string;
   rollNo: string;
}

interface AuthContextType {
   isAuthenticated: boolean;
   userInfo: UserInfo;
   token: string;
   tokenType: string;
   expiresIn: number;
   refreshAuth: () => Promise<void>;
}

// Using token information from the API
const defaultAuthContext: AuthContextType = {
   isAuthenticated: true, // Force authentication to true
   userInfo: {
      companyName: "goMart",
      clientID: "37bb493c-73d3-47ea-8675-21f66ef9b735",
      ownerName: "Rahul",
      ownerEmail: "rahul@abc.edu",
      rollNo: "1",
   },
   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXJrZXRJZCI6IkdNQVJUIiwiQ2xpZW50SUQiOiIzN2JiNDkzYy03M2QzLTQ3ZWEtODY3NS0yMWY2NmVmOWI3MzUiLCJPd25lckVtYWlsIjoicmFodWxAYWJjLmVkdSIsIk93bmVyTmFtZSI6IlJhaHVsIiwiUm9sbE5vIjoiMSIsImV4cCI6MTcxMDgzNTI2OH0.eyJNYXJrZXRJZCI6IkdNQVJUIiwiQ2xpZW50SUQiOiIzN2JiNDkzYy03M2QzLTQ3ZWEtODY3NS0yMWY2NmVmOWI3MzUifQ",
   tokenType: "Bearer",
   expiresIn: 1710835268,
   refreshAuth: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   // Initialize with mock data and always authenticated
   const [authState, setAuthState] =
      useState<Omit<AuthContextType, "refreshAuth">>(defaultAuthContext);

   const refreshAuth = async () => {
      // Mock successful authentication response
      console.log("Authentication refresh bypassed - using mock data");

      // In a real app, we'd call the API:
      // try {
      //    const authResponse = await authenticate();
      //    if (authResponse) {
      //       setAuthState({
      //          isAuthenticated: true,
      //          userInfo: APP_CONFIG.AUTH.CREDENTIALS,
      //          token: authResponse.access_token,
      //          tokenType: authResponse.token_type,
      //          expiresIn: authResponse.expires_in,
      //       });
      //    }
      // } catch (error) {
      //    console.error("Authentication failed:", error);
      //    setAuthState({
      //       ...authState,
      //       isAuthenticated: false,
      //    });
      // }

      // Instead, just ensure we're always authenticated with mock data
      setAuthState({
         isAuthenticated: true,
         userInfo: defaultAuthContext.userInfo,
         token: defaultAuthContext.token,
         tokenType: defaultAuthContext.tokenType,
         expiresIn: defaultAuthContext.expiresIn,
      });
   };

   useEffect(() => {
      // No need to refresh authentication on mount since we're using mock data
      // But we'll keep this for future reference when authentication is needed

      // For now, just ensure we're using the mock data
      refreshAuth();

      // No need for timers since we're not actually authenticating
      // const refreshTimer = setInterval(() => {
      //    const fiveMinutes = 5 * 60 * 1000;
      //    const tokenExpirationTime = authState.expiresIn * 1000;
      //    const timeUntilExpiration = tokenExpirationTime - Date.now();
      //
      //    if (timeUntilExpiration < fiveMinutes) {
      //       refreshAuth();
      //    }
      // }, 60000); // Check every minute
      //
      // return () => clearInterval(refreshTimer);
   }, []);

   return (
      <AuthContext.Provider value={{ ...authState, refreshAuth }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContext;
