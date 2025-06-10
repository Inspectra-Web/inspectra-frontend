import { useState } from "react";
import Button from "../../components/Button";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { BsCheckCircle } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import { FAQsSection } from "./AboutInspectraPage";
import { useGetPlans } from "../../hooks/usePlan";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import nodataImg from "../../assets/no-data-found.svg";
import { useUser } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useInitiateSubscription } from "../../hooks/useSubscription";

// const pricings = [
//   {
//     heading: "Starter",
//     description:
//       "Designed for new or independent realtors just getting started or trying out Inspectra.",
//     price: 5000,
//     btnLabel: "Subscribe Plan",
//     // btnLink: "/sign-up",
//     features: [
//       { yes: true, text: "Maximum of 15 Listings" },
//       { yes: true, text: "Listing Management Tools" },
//       { yes: true, text: "Direct Inquiries from clients" },
//       { yes: true, text: "Basic Analytics" },
//       { yes: true, text: "Live Chats" },
//       { yes: true, text: "Inspection Fee Handling" },
//       { yes: true, text: "Priority Support" },
//       { yes: false, text: "Map Integration" },
//       { yes: false, text: "Featured Listings" },
//       { yes: false, text: "Agency Benefits" },
//       { yes: false, text: "Virtual Tours (Pending)" },
//       { yes: false, text: "Off-Platform Advertising" },
//     ],
//     featuresAnnual: [
//       { yes: true, text: "Maximum of 180 Listings" },
//       { yes: true, text: "Listing Management Tools" },
//       { yes: true, text: "Direct Inquiries from clients" },
//       { yes: true, text: "Basic Analytics" },
//       { yes: true, text: "Live Chats" },
//       { yes: true, text: "Inspection Fee Handling" },
//       { yes: true, text: "Priority Support" },
//       { yes: false, text: "Map Integration" },
//       { yes: false, text: "Featured Listings" },
//       { yes: false, text: "Agency Benefits" },
//       { yes: false, text: "Virtual Tours (Pending)" },
//       { yes: false, text: "Off-Platform Advertising" },
//     ],
//   },
//   {
//     popular: true,
//     heading: "Professionals",
//     description:
//       "Perfect for realtors looking to scale, get more leads and join an agency.",
//     price: 20000,
//     btnLabel: "Subscribe Plan",
//     btnLink: "/sign-up",
//     features: [
//       { yes: true, text: "Up to 50 Listings" },
//       { yes: true, text: "Inspection Fee Handling" },
//       { yes: true, text: "Map Integration" },
//       { yes: true, text: "Up to 5 Featured Listings" },
//       { yes: true, text: "Advanced Analytics" },
//       { yes: true, text: "24/7 Priority Support" },
//       { yes: true, text: "Live Chats" },
//       { yes: true, text: "Virtual Tours (Pending)" },
//       { yes: true, text: "Listing Management Tools" },
//       { yes: true, text: "Direct Inquiries from Clients" },
//       { yes: true, text: "1 Off-Platform Advertising" },
//       { yes: true, text: "Join an agency (Pending)" },
//       { yes: false, text: "Create an Agency (Pending)" },
//     ],
//     featuresAnnual: [
//       { yes: true, text: "Up to 600 Listings" },
//       { yes: true, text: "Inspection Fee Handling" },
//       { yes: true, text: "Map Integration" },
//       { yes: true, text: "Up to 60 Featured Listings" },
//       { yes: true, text: "Advanced Analytics" },
//       { yes: true, text: "24/7 Priority Support" },
//       { yes: true, text: "Live Chats" },
//       { yes: true, text: "Virtual Tours (Pending)" },
//       { yes: true, text: "Listing Management Tools" },
//       { yes: true, text: "Direct Inquiries from Clients" },
//       { yes: false, text: "1 Off-Platform Advertising" },
//       { yes: true, text: "Join an agency (Pending)" },
//       { yes: false, text: "Create an Agency (Pending)" },
//     ],
//   },
//   {
//     heading: "Agencies",
//     description:
//       "Registered real estate firms that want to go full digital and manage everything in one place.",
//     price: 35000,
//     btnLabel: "Subscribe Plan",
//     // btnLink: "",
//     features: [
//       { yes: true, text: "Up to 100 Listings" },
//       { yes: true, text: "10 Featured Listings Max" },
//       { yes: true, text: "24/7 Priority Support" },
//       { yes: true, text: "Live Chats (Pending)" },
//       { yes: true, text: "Virtual Tours (Pending)" },
//       { yes: true, text: "Agency Branding" },
//       { yes: true, text: "Team Management (Pending)" },
//       { yes: true, text: "Advanced Analytics" },
//       { yes: true, text: "Full Map Integrations" },
//       { yes: true, text: "Inspection Fee Handling" },
//       { yes: true, text: "Listing Management Tools" },
//       { yes: true, text: "3 Off-Platform Advertising" },
//       { yes: true, text: "Direct Inquiries from Clients" },
//     ],
//     featuresAnnual: [
//       { yes: true, text: "Up to 1200 Listings" },
//       { yes: true, text: "120 Featured Listings Max" },
//       { yes: true, text: "24/7 Priority Support" },
//       { yes: true, text: "Live Chats (Pending)" },
//       { yes: true, text: "Virtual Tours (Pending)" },
//       { yes: true, text: "Agency Branding" },
//       { yes: true, text: "Team Management (Pending)" },
//       { yes: true, text: "Advanced Analytics" },
//       { yes: true, text: "Full Map Integrations" },
//       { yes: true, text: "Inspection Fee Handling" },
//       { yes: true, text: "3 Off-Platform Advertising" },
//       { yes: true, text: "Listing Management Tools" },
//       { yes: true, text: "Direct Inquiries from Clients" },
//     ],
//   },
// ];

const FAQs = [
  {
    question: "What’s included in the Starter Plan?",
    answer:
      "The Starter Plan is perfect for individual realtors getting started. You can post up to 15 listings, manage them easily, track basic analytics, receive direct inquiries from clients, and even collect inspection fees. However, it does not include map integration, off-platform advertising or featured listings.",
  },
  // {
  //   question: "Can I receive inspection fees on the Starter Plan?",
  //   answer:
  //     "Yes. Only Professional and Agency plans support inspection fee handling.",
  // },
  {
    question: "What makes the Professional Plan different?",
    answer:
      "The Professional Plan gives you room to scale—up to 50 listings, map integration, 5 featured listings, advanced analytics, and support for inspection fees. You’ll also get priority support and tools to join an agency.",
  },
  {
    question: "Can I create an agency with the Professional Plan?",
    answer:
      "No, Professional users can join an agency, but only Agency Plan users can create and manage one.",
  },
  {
    question: "What are featured listings?",
    answer:
      "Featured listings appear in top spots or highlighted sections on Inspectra, giving them more visibility to clients.",
  },
  {
    question: "What do I get with the Agency Plan?",
    answer:
      "The Agency Plan is designed for real estate firms. You can add unlimited listings, invite and manage realtors, receive inspection fees, and enjoy full analytics, branding, featured listings, and 24/7 support. Team management tools are also in progress.",
  },
  {
    question: "Is team management available in the Agency Plan?",
    answer:
      "Not yet, but it’s coming soon. Agencies will soon be able to assign listings to specific realtors and manage team performance.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes, you can upgrade at any time. If you move from Starter to Professional, your new features are activated immediately, and your billing adjusts accordingly.\n However, downgrading works a bit differently. If you're on the Professional plan and choose to downgrade to Starter, the change takes effect after your current billing cycle ends. This prevents interruptions to features like agency benefits or map integration that Starter doesn't support.",
  },
  {
    question: "Do all plans have direct inquiry features?",
    answer:
      "Yes, all plans allow clients to send inquiries directly to you from your listings.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, but only for new users. Whether you're a Realtor or an Agency, new accounts receive a 30-day free trial on any plan. This allows you to explore Inspectra’s features before making a payment decision.",
  },
];

function SubscribeButton({ plan, user, active, navigate, isAuthenticated }) {
  const { mutate, isPending: isSubscribing } = useInitiateSubscription();

  const handleSubscribe = () => {
    if (plan.heading === "Agency") {
      toast.info(
        "We're still building advanced features like team management and visibility tools for the AGENCY PLANS."
      );
      return;
    }
    if (!isAuthenticated) {
      localStorage.setItem("redirectAfterLogin", "/pricings");
      toast.info("Please Login to SUBSCRIBE to plan");
      navigate("/sign-in");
      return;
    }

    mutate(
      {
        planId: plan[active].planId,
        email: user.email,
        fullname: user.fullname,
      },
      {
        onSuccess: (subscribe) => {
          window.location.href = subscribe.paymentLink;
          console.log(subscribe.paymentLink);
        },
      },
      {
        onError: (error) => {
          toast.error("Failed to initiate payment. Please try again.");
          console.error(error);
        },
      }
    );
  };

  return (
    <Button onClick={handleSubscribe} disabled={isSubscribing}>
      {isSubscribing ? (
        <LoaderSm />
      ) : (
        <>
          <span>{plan.btnLabel}</span>
          <HiOutlinePaperAirplane size={24} />
        </>
      )}
    </Button>
  );
}

export default function PricingsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const { isError, isPending, plans } = useGetPlans();

  console.log(plans);
  const [active, setActive] = useState("monthly");

  // const calculator = (value) => value * 12 - (value * 12 * 20) / 100;

  return (
    <main>
      {isPending ? (
        <LoaderMd />
      ) : isError ? (
        <div className="text-center my-20 flex flex-col items-center">
          <img src={nodataImg} className="w-96" />
          <h2 className="heading-2 my-5 capitalize">Unable to load Pricings</h2>
          <p className="text-slate-500">
            Kindly check your internet connection and reload again.
          </p>
        </div>
      ) : (
        <section className="min-h-[65rem] py-20 px-32 midtablet:px-10 flex flex-col items-center">
          <h1 className="heading-2 text-9xl text-center mb-20 smtablet:text-8xl">
            Pricing Plans
          </h1>
          <div className="flex gap-8 border border-sky-400 rounded-full p-5">
            <button
              onClick={() => setActive("yearly")}
              className={`flex focus:ring-4 ring-offset-2 items-center gap-3 px-16 py-10 rounded-full ${
                active === "yearly"
                  ? "text-white font-semibold bg-gradient-to-tr from-blue-500 to-blue-700"
                  : "text-blue-500"
              } bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease justify-center cursor-pointer`}
            >
              Yearly
            </button>
            <button
              onClick={() => setActive("monthly")}
              className={`flex focus:ring-4 ring-offset-2 items-center gap-3 px-16 py-10 rounded-full ${
                active === "monthly"
                  ? "text-white font-semibold bg-gradient-to-tr from-blue-500 to-blue-700"
                  : "text-blue-500"
              }  bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease justify-center cursor-pointer`}
            >
              Monthly
            </button>
          </div>
          <p className="mt-5 items-center flex gap-2">
            Save up to{" "}
            <span className="font-semibold text-blue-500 text-4xl">20%</span>{" "}
            with yearly plans
          </p>
          <section className="grid grid-cols-3 gap-32 mt-40 midtablet:gap-10 bigmobile:grid-cols-1 bigmobile:mt-20">
            {plans?.map((plan, index) => (
              <div
                key={index}
                className={`${
                  plan.popular && "bg-gradient-to-tr from-cyan-50 to-sky-50"
                }  flex flex-col items-center gap-6 py-20 px-10 bigmobile:py-10`}
              >
                {plan.popular && (
                  <span
                    className={`text-sky-100 px-10 py-5 bg-sky-800 rounded-3xl`}
                  >
                    MOST POPULAR
                  </span>
                )}

                <h4 className="text-stone-500 font-semibold text-6xl">
                  {plan.heading}
                </h4>
                <p className="text-center">{plan.description}</p>
                <p className="text-center mb-5">
                  <span className="text-8xl smtablet:text-7xl font-bold text-blue-500 block">
                    ₦
                    {(active === "yearly"
                      ? plan[active].price
                      : plan[active].price
                    )?.toLocaleString()}
                  </span>{" "}
                  {active} per user
                </p>
                <SubscribeButton
                  plan={plan}
                  user={user}
                  active={active}
                  navigate={navigate}
                  isAuthenticated={isAuthenticated}
                />
                <ul className="w-4/5 flex flex-col gap-5 mt-10 midtablet:w-full">
                  {plan[active].features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-5">
                      {feature.yes ? (
                        <BsCheckCircle className="text-4xl text-blue-500" />
                      ) : (
                        <SlClose className="text-4xl text-rose-500" />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </section>
      )}

      <FAQsSection FAQs={FAQs} />
    </main>
  );
}
