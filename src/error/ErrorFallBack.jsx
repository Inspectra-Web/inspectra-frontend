import ParticlesBg from "../components/ParticlesBg";
import Button from "../components/Button";
import { HiOutlineRefresh } from "react-icons/hi";
import { Container } from "../ui/Container";
import { Header } from "../ui/Header";
import GoBackBtn from "../components/GoBackBtn";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useAuth";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  const { user } = useUser();

  const homeLink =
    user?.role === "client"
      ? "/client"
      : user?.role === "realtor"
      ? "/app"
      : "/";

  return (
    <Container>
      <ParticlesBg />
      <Header
        description="Need a new account?"
        link="/sign-up"
        label="Sign up"
      />
      <div className="bg-slate-950 p-10 bg-opacity-25 mx-auto mt-20 max-w-[65rem] min-h-20 rounded-3xl shadow-sm text-white text-center">
        <h1 className="font-bold text-6xl text-red-500 mb-5">
          Something went wrong
        </h1>
        <h2 className="text-2xl font-medium mb-5">
          An unexpected error occurred while loading this page.
        </h2>
        <p>{error}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
        <p className="text-lg mb-10">
          This could be due to a temporary issue or a bug in the system. Try
          going back or refreshing the page.
        </p>
        <div className="mt-10 flex items-center gap-10 justify-center">
          <Link to={homeLink}>
            <Button>
              <span>Go to Homepage</span>
              <HiOutlineRefresh size={24} />
            </Button>
          </Link>
          <GoBackBtn marginB="mb-0" />
        </div>
      </div>
    </Container>
  );
}
