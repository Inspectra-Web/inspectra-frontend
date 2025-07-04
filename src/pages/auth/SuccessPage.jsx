import ParticlesBg from "../../components/ParticlesBg";
import Button from "../../components/Button";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { emailVerify } from "../../services/apiAuth";
import { Container } from "../../ui/Container";
import { Header } from "../../ui/Header";

export default function SuccessPage() {
  const { token } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verifier() {
      if (token) {
        try {
          const data = await emailVerify({ token });
          setUser(data);
        } catch (err) {
          console.error("Verification failed:", err);
        }
      }
    }

    verifier();
  }, [token]);

  return (
    <Container>
      <ParticlesBg />
      <Header description="Ready to explore?" link="/sign-in" label="Sign in" />

      <div className="bg-slate-950 p-10 bg-opacity-25 mx-auto mt-20 max-w-[65rem] min-h-20 rounded-3xl shadow-sm text-white">
        {/* Heading */}
        <h1 className="font-bold text-5xl text-center mb-6">
          You&apos;re Verified!
        </h1>

        {/* Common Message */}
        <p className="text-lg text-center mb-10">
          Congratulations! You&apos;ve successfully completed the verification
          process.
        </p>

        {user?.role === "realtor" && (
          <>
            {/* Realtor Specific Content */}
            <div className="text-lg leading-relaxed text-center">
              <p>
                You are now ready to leverage <strong>Inspectra</strong>&apos;s
                platform to manage properties, connect effortlessly with
                clients, and streamline your real estate services.
              </p>
              <p className="mt-4">
                Start exploring all the tools Inspectra offers to empower your
                business and elevate your realtor experience.
              </p>
            </div>

            <h3 className="font-semibold text-2xl text-center mt-12">
              Next Steps
            </h3>
            <ol className="list-decimal list-inside mt-4 mb-10 text-lg italic text-center">
              <li>Head over to the login page to access your dashboard.</li>
              <li>Set up your realtor profile to get started.</li>
              <li>Begin adding and managing your property listings!</li>
            </ol>
          </>
        )}

        {user?.role === "client" && (
          <>
            {/* Client Specific Content */}
            <div className="text-lg leading-relaxed text-center">
              <p>
                Welcome to <strong>Inspectra</strong> — your gateway to finding
                the perfect property!
              </p>
              <p className="mt-4">
                You can now browse listings, schedule inspections, and chat
                directly with verified realtors.
              </p>
            </div>

            <h3 className="font-semibold text-2xl text-center mt-12">
              Next Steps
            </h3>
            <ol className="list-decimal list-inside mt-4 mb-10 text-lg italic text-center">
              <li>Head over to the login page to access your dashboard.</li>
              <li>
                Complete your profile so we can better personalize property
                suggestions.
              </li>
              <li>
                Start browsing properties and schedule your first inspection!
              </li>
            </ol>
          </>
        )}

        {/* Button */}
        <div className="flex justify-center mt-10">
          <Button variation="link" link="/sign-in">
            <span>Go to Sign Page</span>
            <HiOutlinePaperAirplane size={24} />
          </Button>
        </div>
      </div>
    </Container>
  );
}
