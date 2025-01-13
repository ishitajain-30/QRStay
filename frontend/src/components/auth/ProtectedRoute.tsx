import { Navigate, useLocation } from "react-router-dom";
import { getAuthToken, getUser } from "@/lib/auth";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const token = getAuthToken();
  const user = getUser();
  const location = useLocation();

  if (!token && !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
