import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard.jsx";
import NoLayout from "./components/NoLayout/NoLayout.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute/PublicRoute.jsx";
import NotFound from "./screens/NotFound/NotFound.jsx";
import "./App.css";

// Lazy load secondary page components for code splitting
// Dashboard is eagerly loaded since it's the main entry point
const LoginPage = lazy(() => import("./screens/LoginPage/Login"));
const CopyJourney = lazy(
  () => import("./screens/CopyEventJourney/CopyEventJourney.jsx"),
);
const ViewEvent = lazy(() => import("./screens/ViewEvent/ViewEvent.jsx"));
const EditEvent = lazy(() => import("./screens/EditEvent/EditEvent.jsx"));
const SuccessPage = lazy(() => import("./screens/SuccessPage/SuccessPage"));

/**
 * Loading fallback component for lazy-loaded routes
 */
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

/**
 * Main App Component
 * Handles routing and lazy-loaded pages
 * Dashboard fetches its own data using React Query
 */
function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<NoLayout />}>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Route>
        <Route element={<MainLayout />}>
          <Route
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
            path="/dashboard"
          />
          <Route
            element={
              <ProtectedRoute>
                <ViewEvent />
              </ProtectedRoute>
            }
            path="/event/view"
          />
          <Route
            element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            }
            path="/event/edit"
          />
          <Route
            element={
              <ProtectedRoute>
                <CopyJourney />
              </ProtectedRoute>
            }
            path="/event/copy"
          />
          <Route
            element={
              <ProtectedRoute>
                <SuccessPage />
              </ProtectedRoute>
            }
            path="/success"
          />
        </Route>
        {/* Catch-all 404 route - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
