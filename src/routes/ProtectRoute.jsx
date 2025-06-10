import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useAuth";
import { LoaderLg } from "../static/Loaders";

export default function ProtectRoute({ children }) {
  const location = useLocation();
  const { isPending, isError, isAuthenticated } = useUser();
  console.log(location);
  // useEffect(
  //   function () {
  //     if (!user && !isPending) navigate("/sign-in", { replace: true });
  //   },
  //   [user, isPending, navigate]
  // );

  if (isPending) return <LoaderLg />;

  if (isError) {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/session-expire" state={{ from: location }} />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}
