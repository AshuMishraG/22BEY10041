import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Social Media Analytics Dashboard",
   description: "Real-time social media analytics dashboard - 22BEY10041",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <Providers>
               <div className="min-h-screen bg-gray-50">
                  <Navbar />
                  <main className="container mx-auto px-4 py-6">
                     {children}
                  </main>
               </div>
            </Providers>
         </body>
      </html>
   );
}
