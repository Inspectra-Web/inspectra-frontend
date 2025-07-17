import ParticlesBg from "../components/ParticlesBg";
import Button from "../components/Button";
import { HiOutlineRefresh } from "react-icons/hi";
import { Container } from "../ui/Container";
import { Header } from "../ui/Header";
import GoBackBtn from "../components/GoBackBtn";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useAuth";

export default function NotFoundPage() {
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
        description="Don't have an account?"
        link="/sign-up"
        label="Sign up"
      />
      <div className="bg-slate-950 p-10 bg-opacity-25 mx-auto mt-20 max-w-[65rem] min-h-20 rounded-3xl shadow-sm text-white text-center">
        <h1 className="font-bold text-8xl text-yellow-400 mb-5">404</h1>
        <h2 className="text-3xl font-semibold mb-5">Page Not Found</h2>
        <div className="text-lg mb-10">
          <p>We couldn&apos;t find the page you&apos;re looking for.</p>
          <p>It might have been removed, renamed, or it never existed.</p>
        </div>
        <p className="text-lg">Try going back or return to the homepage.</p>
        <div className="mt-10 flex items-center gap-10">
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
