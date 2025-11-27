"use client";

import React, { useEffect, useState } from "react";
import {
  Authenticator,
  useAuthenticator,
  View,
  Heading,
  Image,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import { AlertTriangle, LogOut, Loader2 } from "lucide-react";

// This checks if the user is an Admin
function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkGroup = async () => {
      if (!user) return;
      try {
        const session = await fetchAuthSession();
        const groups = session.tokens?.accessToken?.payload["cognito:groups"];

        if (Array.isArray(groups) && groups.includes("Admins")) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Session check failed", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkGroup();
  }, [user]);

  if (isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 text-slate-500 gap-2">
        <Loader2 className="animate-spin" /> Verifying Permissions...
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="p-4 bg-red-100 text-red-600 rounded-full">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
        <p className="text-slate-600">You are not an Administrator.</p>
        <button
          onClick={signOut}
          className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

// Custom Header for the Login Screen
const components = {
  Header() {
    return (
      <View textAlign="center" padding="large">
        <Heading level={3} color="#0f172a">
          SeeForMe Admin
        </Heading>
        <p style={{ color: "#64748b" }}>Please sign in to continue</p>
      </View>
    );
  },
};

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator components={components} hideSignUp={true}>
      {/* 
         CRITICAL: The logic inside here ONLY runs after successful login.
         This prevents the "UserUnauthenticatedException" error.
      */}
      {() => <AdminGuard>{children}</AdminGuard>}
    </Authenticator>
  );
}
