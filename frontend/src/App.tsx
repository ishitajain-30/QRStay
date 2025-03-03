import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { GuestAdminDashboard } from "@/pages/guest-admin/GuestAdminDashboard";
import { GuestDashboard } from "@/pages/guest/GuestDashboard";

function App() {
  return (
    <div className="w-screen flex items-center  justify-center">
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["main_admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guest-admin"
            element={
              <ProtectedRoute allowedRoles={["guest_admin"]}>
                <GuestAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guest"
            element={
              <ProtectedRoute allowedRoles={["guest"]}>
                <GuestDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
