import type { Metadata } from "next";
import "./globals.css";
import "@aws-amplify/ui-react/styles.css";
import ConfigureAmplify from "@/components/ConfigureAmplify";
import AuthWrapper from "@/components/AuthWrapper";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "SeeForMe Admin Panel",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ADDED CLASSES HERE: bg-gray-50 text-slate-900 antialiased */}
      <body className="bg-gray-50 text-slate-900 antialiased">
        <ConfigureAmplify />

        <AuthWrapper>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto h-screen">
              {children}
            </main>
          </div>
        </AuthWrapper>
      </body>
    </html>
  );
}
