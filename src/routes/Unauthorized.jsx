import { Link } from "react-router-dom";
import { useUser } from "../hooks/useAuth";
import Button from "../components/Button";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

// Unauthorized.jsx
export default function Unauthorized() {
  const { user } = useUser();
  return (
    <div className="p-10 text-center flex items-center justify-center flex-col">
      <h1 className="text-5xl font-bold">🚫 Access Denied</h1>
      <p className="mt-2 mb-10 text-3xl">
        You don’t have permission to view this page.
      </p>
      <Link
        to={`${user?.role === "client" ? "/client/overview" : "/app/overview"}`}
      >
        <Button>
          <span>Go to Authorized Page</span>
          <HiOutlinePaperAirplane size={24} />
        </Button>
      </Link>
    </div>
  );
}
