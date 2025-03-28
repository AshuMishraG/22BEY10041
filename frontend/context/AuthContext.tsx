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
      companyName: "SocialApp",
      clientID: "62d73af2-3257-4030-b451-f6e1c8c1bc33",
      ownerName: "Ashutosh",
      ownerEmail: "ashutoshmishra2022@vitbhopal.ac.in",
      rollNo: "22BEY10041",
   },
   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzMTM5MzkxLCJpYXQiOjE3NDMxMzkwOTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsInN1YiI6ImFzaHV0b3NobWlzaHJhMjAyMkB2aXRiaG9wYWwuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTb2NpYWxBcHAiLCJjbGllbnRJRCI6IjYyZDczYWYyLTMyNTctNDAzMC1iNDUxLWY2ZTFjOGMxYmMzMyIsImNsaWVudFNlY3JldCI6IkdWeXZyRW1CeVFtcVNab0EiLCJvd25lck5hbWUiOiJBc2h1dG9zaCIsIm93bmVyRW1haWwiOiJhc2h1dG9zaG1pc2hyYTIwMjJAdml0YmhvcGFsLmFjLmluIiwicm9sbE5vIjoiMjJCRVkxMDA0MSJ9.5XiwrD6xOXOAREY0PFDdZEvTJHaynAcQt0wsqifpoXk",
   tokenType: "Bearer",
   expiresIn: 1743139391,
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
