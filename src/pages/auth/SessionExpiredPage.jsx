import ParticlesBg from "../../components/ParticlesBg";
import Button from "../../components/Button";
import { HiOutlineRefresh } from "react-icons/hi";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";
import GoBackBtn from "../../components/GoBackBtn";
import { useLocation, useNavigate } from "react-router-dom";

export default function SessionExpiredPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const from =
    location.state?.from?.pathname ||
    localStorage.getItem("redirectAfterLogin") ||
    "/app/overview";

  function handleLoginRedirect() {
    navigate("/sign-in", { state: { from } });
  }
  return (
    <Container>
      <ParticlesBg />
      <Header
        description="Don't have an account?"
        link="/sign-up"
        label="Sign up"
      />
      <div className="bg-slate-950 p-10 bg-opacity-25 mx-auto mt-20 max-w-[65rem] min-h-20 rounded-3xl shadow-sm text-white text-center">
        <h1 className="font-bold text-6xl text-red-500 mb-5">Session Closed</h1>
        <div className="text-lg mb-10">
          <p>Problem might be as a result of the following: </p>
          <ul>
            <li>1. Session has either expired due to inactivity.</li>
            <li>2. Slow or unstable internet connection.</li>
            <li>3. Request / Response timeout</li>
          </ul>
        </div>
        <p className="text-lg">
          For security reasons, please log in again to continue using Inspectra.
        </p>
        <div className="mt-10 flex items-center gap-10">
          <Button onClick={handleLoginRedirect}>
            <span>Log In Again</span>
            <HiOutlineRefresh size={24} />
          </Button>
          <GoBackBtn marginB="mb-0" />
        </div>
      </div>
    </Container>
  );
}
