// src/component/RoleRoute.tsx
import React, { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleRouteProps extends PropsWithChildren {
  allowedRoles: string[];
}

export default function RoleRoute({ children, allowedRoles }: RoleRouteProps): JSX.Element {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-8 text-white text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(user?.role || '')) {
    console.warn(`Frontend: Unauthorized route access attempt by ${user?.role || 'unknown'} user`);
    // Instead of redirect, show forbidden component
    return <ForbiddenPage />;
  }

  return <>{children}</>;
}

function ForbiddenPage(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-md mx-auto p-8 bg-gray-900/80 backdrop-blur-md border border-red-500/20 rounded-2xl shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-red-400">Access Denied</h1>
        <p className="text-lg mb-6 text-gray-300">You do not have permission to access this page.</p>
        <p className="text-sm text-gray-500 mb-6">Required role: Administrator</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium shadow-lg shadow-cyan-900/20 transition-all hover:shadow-xl"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}