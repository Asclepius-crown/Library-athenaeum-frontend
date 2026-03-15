import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import RoleRoute from "./component/RoleRoute";

import LandingPage from "./component/landing";
import DatabasePage from "./component/Database";
// import { StudentProvider } from "./component/LibraryStudentInfo.jsx";
import { StudentProvider } from "./context/StudentContext";
import StudentProfile from "./component/Student/StudentProfile";
import AdminDashboard from "./component/Admin/AdminDashboard"; // Import AdminDashboard
import { Toaster } from "react-hot-toast";

const DigitalLibraryPage = lazy(() => import("./component/Digital"));
const CatalogPage = lazy(() => import("./component/catalog.jsx"));
const BorrowedStudentsPage = lazy(() => import("./component/BorrowedStudentsPage"));

function NotFoundPage(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    </div>
  );
}

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LandingPage />} />
        <Route path="/register" element={<LandingPage />} />

        {/* Protected routes */}
        <Route
          path="/catalog"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<div className="p-8 text-white">Loading...</div>}
              >
                <CatalogPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/database"
          element={
            <RoleRoute allowedRoles={['admin']}>
              <DatabasePage />
            </RoleRoute>
          }
        />
        <Route
          path="/digital-library"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<div className="p-8 text-white">Loading...</div>}
              >
                <DigitalLibraryPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/borrowed-students"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<div className="p-8 text-white">Loading...</div>}
              >
                <BorrowedStudentsPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <StudentProvider>
                <StudentProfile />
              </StudentProvider>
            </PrivateRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;