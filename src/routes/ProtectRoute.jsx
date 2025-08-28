import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useAuth";
import { LoaderLg } from "../static/Loaders";

export default function ProtectRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const { isPending, isError, isAuthenticated, user } = useUser();

  if (isPending) return <LoaderLg />;

  if (isError) {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/session-expire" state={{ from: location }} />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role))
    return <Navigate to="/unauthorized" replace />;

  return children;
}
