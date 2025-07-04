import Button from "../../components/Button";
import { HiOutlinePaperAirplane, HiOutlineUsers } from "react-icons/hi2";
import { CiCalendar, CiGlobe, CiMap, CiSearch } from "react-icons/ci";
import { BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  HiFingerPrint,
  HiOutlineAdjustments,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";
import { PiBuildingOfficeThin } from "react-icons/pi";
// import { FaStar } from "react-icons/fa";
import { BsCreditCard, BsHouseLock } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";

const FAQs = [
  {
    question: "What is Inspectra?",
    answer:
      "Inspectra is a modern real estate platform solving key issues in Nigeria’s property market. It lets users find, inspect, and chat about listings, while agencies can manage their realtors and track leads — all in one place.",
  },
  {
    question: "Who can use Inspectra?",
    answer:
      "Inspectra is built for property seekers, realtors, and real estate agencies. Whether you're buying, renting, listing, or managing agents — it's made for you.",
  },
  {
    question: "How do I schedule a property inspection?",
    answer:
      "Click the “Schedule Inspection” button on any property listing, select a date and time, and you’re done!",
  },
  {
    question: "Can I chat directly with a Realtor?",
    answer:
      "Yes! After submitting an inquiry, you’ll be able to chat with the assigned realtor in real time.",
  },
  {
    question: "What if a property is no longer available?",
    answer:
      "We mark sold, rented, or unavailable listings clearly and remove outdated ones to keep your search experience smooth.",
  },
  {
    question: "How does Inspectra support agencies?",
    answer:
      "Agencies can manage multiple realtors, assign listings, and monitor activity. Tools for team collaboration and analytics are included or coming soon.",
  },
  {
    question: "Is Inspectra free to use?",
    answer:
      "Yes. Searching and inquiring are free. Realtors and agencies can access more features through flexible paid plans.",
  },
  {
    question: "What features are coming soon?",
    answer:
      "Upcoming upgrades include virtual tours, 360° property views, smart lead tracking, and advanced performance insights.",
  },
];

export default function AboutInspectraPage() {
  return (
    <>
      <div className="text-center text-3xl px-10 pb-5 bigmobile:py-5 font-medium text-sky-700">
        Start your{" "}
        <Link
          to="/sign-up"
          className="text-sky-900 inline-block font-bold px-10 py-3 bg-blue-400 hover:ring-2 transition-all rounded-md"
        >
          30-Day Free Trial
        </Link>{" "}
        — explore smarter real estate tools with zero risk.
      </div>

      <HeroSection />
      {/* <StatsSection /> */}
      <CoreFeaturesSection />
      <WhoItsForSection />
      <HowItWorksSection />
      {/* <StoriesSection /> */}
      <FAQsSection FAQs={FAQs} />
      <CTASection />
    </>
  );
}

// Hero Section
function HeroSection() {
  const className = (clr) =>
    `before:content-[''] relative ${clr} before:w-full before:h-full before:absolute before:rounded-2xl inline-block before:inline-block z-50 before:-z-10 before:inset-0 before:-skew-x-12 uppercase m-3 px-3`;

  return (
    <main className="min-h-[65rem] text-blue-50 midmobile:py-10 grid grid-cols-3 px-32 items-center bg-[url('https://res.cloudinary.com/dpvelfbzm/image/upload/v1735653255/property_images/h092p75rr87jtqdkd6wb.jpg')] bg-cover bg-center relative midtablet:px-10 bigmobile:grid-cols-1 smmobile:gap-5">
      <div className="absolute inset-0 bg-opacity-70 bg-sky-950"></div>
      <div className="relative z-[10] col-span-2 bigmobile:col-span-1 bigmobile:text-center bigmobile:flex bigmobile:flex-col bigmobile:items-center">
        <h1 className="leading-[1.2] font-semibold text-[7rem] midtablet:text-[6rem] midmobile:text-[5rem] ">
          Easiest way to{" "}
          <span className={className("before:bg-sky-500")}>showcase</span>,
          <span className={className("before:bg-cyan-500")}>discover</span> &{" "}
          <span className={className("before:bg-blue-500")}>inspect</span>{" "}
          verified properties.
        </h1>
        <p className="text-[2rem] mt-5 mb-20">
          No more random DMs. No more fake listings. Just trust.
        </p>
        <div className="flex gap-5 flex-wrap bigmobile:justify-center">
          <Button link="/sign-up" variation="link">
            Get started as a Realtor
            <HiOutlinePaperAirplane size={24} />
          </Button>
          <Button link="/listings" variation="bordered">
            <span className="text-white">Browse Listings</span>
            <CiGlobe size={24} />
          </Button>
        </div>
      </div>
      <div className="flex justify-center col-span-1 bigmobile:row-start-1">
        <span className="flex h-[10rem] w-[10rem] relative smmobile:h-[6rem] smmobile:w-[6rem]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-sky-500 to-blue-500 opacity-75"></span>
          <span className="relative rounded-full h-[10rem] w-[10rem] bg-gradient-to-b from-sky-500 to-blue-800 flex justify-center items-center cursor-pointer smmobile:h-[6rem] smmobile:w-[6rem]">
            {/* <FaPlay className="text-[2rem] smmobile:text-[1.5rem]" /> */}
            <img
              src="/inspectra-logo-white-sm.png"
              alt="Inspectra-Logo"
              className="smmobile:w-[4.5rem]"
            />
          </span>
        </span>
      </div>
    </main>
  );
}

// Stats Section
// const stats = [
//   {
//     stat: "2.5k+",
//     label: "Verified Properties",
//   },
//   {
//     stat: "500+",
//     label: "Trusted Realtors",
//   },
//   {
//     stat: "10k+",
//     label: "Happy Clients",
//   },
//   {
//     stat: "1k+",
//     label: "Cities Covered",
//   },
// ];

// function StatsSection() {
//   return (
//     <section className="bg-blue-50 py-12">
//       <div className="container">
//         <div className="grid grid-cols-4 smtablet:grid-cols-2 gap-8">
//           {stats.map((el, index) => (
//             <div className="text-center" key={index}>
//               <p className="font-bold heading-2 text-[5.4rem] smmobile:text-[6rem]">
//                 {el.stat}
//               </p>
//               <p>{el.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// Core Features Section
const core = [
  {
    icon: (
      <HiFingerPrint className="text-blue-600 text-[3.5rem] midmobile:text-[3rem]" />
    ),
    heading: "Verified Listings",
    description:
      "Every property on our platform is verified by our team to ensure accuracy and authenticity, giving you peace of mind.",
    lists: [
      "Authentic property details",
      "High-quality images",
      "Accurate location information",
    ],
    href: "/listings",
    hrefLabel: "Browse Verified Listings",
    color: "blue",
    iconcolor: "from-blue-50 to-blue-100",
  },
  {
    icon: (
      <HiOutlineOfficeBuilding className="text-sky-600 text-[3.5rem] midmobile:text-[3rem]" />
    ),
    heading: "Book Inspections",
    description:
      "Schedule property viewings with just a few clicks. Our streamlined booking system makes it easy to find the perfect time.",
    lists: [
      "Real-time availability",
      "Instant confirmation",
      "Reminder notifications",
    ],
    href: "/listings",
    hrefLabel: "Schedule an Inspection",
    color: "sky",
    iconcolor: "from-sky-50 to-sky-100",
  },
  {
    icon: (
      <HiOutlineUsers className="text-cyan-600 text-[3.5rem] midmobile:text-[3rem]" />
    ),
    heading: "Trusted Realtors",
    description:
      "Connect with verified, professional realtors who are experts in their local markets and committed to your success.",
    lists: [
      "Verified credentials",
      "Client reviews and ratings",
      "Direct messaging",
    ],
    href: "#",
    hrefLabel: "Find a Realtor",
    color: "cyan",
    iconcolor: "from-cyan-50 to-cyan-100",
  },
  {
    icon: (
      <BsCreditCard className="text-indigo-600 text-[3.5rem] midmobile:text-[3rem]" />
    ),
    heading: "Escrow System",
    description:
      "Our secure payment and escrow system protects both buyers and sellers throughout the transaction process.",
    lists: [
      "Encrypted transactions",
      "Secure escrow services",
      "Multiple payment options",
    ],
    href: "#",
    hrefLabel: "Learn about payments",
    color: "indigo",
    iconcolor: "from-indigo-50 to-indigo-100",
  },
  {
    icon: (
      <HiOutlineAdjustments className="text-purple-600 text-[3.5rem] midmobile:text-[3rem]" />
    ),
    heading: "Analytics Dashboard",
    description:
      "Powerful analytics tools for agents to track performance, monitor leads, and optimize their listings.",
    lists: ["Performance metrics", "Lead tracking", "Market insights"],
    href: "#",
    hrefLabel: "Explore Analytics",
    color: "purple",
    iconcolor: "from-purple-50 to-purple-100",
  },
];

function CoreFeaturesSection() {
  return (
    <section className="py-40 px-32 bigtablet:px-10 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-[5rem]">Core Features</h2>
          <p className="max-w-5xl text-[1.7rem] mx-auto">
            Inspectra provides a comprehensive platform for property seekers,
            realtors, and agencies to connect and transact with confidence.
          </p>
        </div>

        <div className="grid grid-cols-3 midtablet:grid-cols-2 bigmobile:grid-cols-1 gap-8">
          {/* Verified Listings */}
          {core.map((el, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-16 midmobile:p-8 border border-${el.color}-100 hover:shadow-${el.color}-50 hover:shadow transition-shadow`}
            >
              <div
                className={`h-[7rem] w-[7rem] midmobile:h-[6rem] midmobile:w-[6rem] rounded-full bg-gradient-to-tr ${el.iconcolor} flex items-center justify-center mb-12`}
              >
                {el.icon}
              </div>
              <h3 className="text-5xl font-bold mb-6 text-[#333]">
                {el.heading}
              </h3>
              <p className="mb-12 text-[1.7rem]">{el.description}</p>
              <ul className="space-y-4 text-[1.7rem] text-[#333]">
                {el.lists.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <BiCheckCircle
                      className={`text-[2rem] text-${el.color}-600 shrink-0 mt-0.5`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                onClick={() => {
                  el.href === "#" && toast.info("Page is not available yet!");
                }}
                to={el.href}
                className={`inline-flex items-center text-${el.color}-600 font-medium mt-12 hover:text-${el.color}-700`}
              >
                {el.hrefLabel}
                <MdKeyboardDoubleArrowRight className="ml-2 text-[1.7rem]" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Who it's For Section
const prospects = [
  {
    icon: <HiOutlineUsers className="h-12 w-12 text-sky-600" />,
    iconColor: "bg-sky-100",
    heading: "Realtors & Freelance Agents",
    description:
      "Expand your client base, showcase your listings, and manage property viewings efficiently with our specialized tools designed specifically for real estate professionals.",
  },
  {
    icon: <HiOutlineOfficeBuilding className="h-12 w-12 text-blue-600" />,
    iconColor: "bg-blue-100",
    heading: "Real Estate Agencies",
    description:
      "Manage your team of agents, track performance, and build your agency's brand with our comprehensive agency tools and analytics dashboard.",
  },
  {
    icon: <CiSearch className="h-12 w-12 text-cyan-600" />,
    iconColor: "bg-cyan-100",
    heading: "Individuals Looking to Rent or Buy",
    description:
      "Find your dream property with confidence through verified listings, detailed information, and seamless inspection booking that puts you in control of your property search.",
  },
  {
    icon: <BsHouseLock className="h-12 w-12 text-indigo-600" />,
    iconColor: "bg-indigo-100",
    heading: "Property Owners Wanting to List",
    description:
      "List your property with ease, connect with verified realtors, and track interest from potential buyers or renters through our intuitive owner dashboard.",
  },
];

function WhoItsForSection() {
  return (
    <section className="px-32 pb-40 bigtablet:px-10 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-[5rem]">Who is it For?</h2>
          <p className="max-w-5xl text-[1.7rem] mx-auto">
            Inspectra serves multiple stakeholders in the real estate ecosystem,
            providing tailored solutions for each.
          </p>
        </div>

        <div className="flex bigmobile:flex-wrap gap-24 items-center">
          {/* Left side - Image */}
          <div className="relative w-1/2 bigmobile:w-full">
            <div className="relative rounded-3xl overflow-hidden flex justify-center">
              <img
                src="https://img.freepik.com/free-photo/medium-shot-man-working-as-real-estate-agent_23-2151064826.jpg?ga=GA1.1.900851164.1744327576&semt=ais_hybrid&w=740"
                alt="Image here"
                className="h-[60rem] midmobile:h-[40rem] rounded-3xl object-cover"
              />
              <div className="absolute"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-blue-50 rounded-xl p-8 shadow-lg border border-blue-100 block">
              <div className="flex items-center gap-3">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <BiCheckCircle className="text-[2rem] text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Trusted Platform
                  </h4>
                  <p className="text-sm text-blue-700">For Property Seekers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - List of users */}
          <div className="w-1/2 bigmobile:w-full">
            <ul className="space-y-12">
              {prospects.map((prospect, index) => (
                <li key={index} className="flex gap-8">
                  <div
                    className={`h-24 w-24 rounded-full ${prospect.iconColor} flex-shrink-0 flex items-center justify-center`}
                  >
                    {prospect.icon}
                  </div>
                  <div>
                    <h4 className="text-[2.2rem] text-[#333] font-semibold mb-2">
                      {prospect.heading}
                    </h4>
                    <p className="text-[1.7rem]">{prospect.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// How it works Section
const method = [
  {
    iconcolor: "from-blue-50 to-blue-100",
    icon: <CiSearch className="text-[3.5rem] text-blue-600" />,
    heading: "Search Properties",
    description:
      "Find properties for rent, sale, lease, or shortlet using filters like location and price.",
  },
  {
    iconcolor: "from-sky-50 to-sky-100",
    icon: <CiMap className="text-[3.5rem] text-sky-600" />,
    heading: "Book Inspection",
    description:
      "Easily schedule physical or virtual inspections with trusted realtors.",
  },
  {
    iconcolor: "from-cyan-50 to-cyan-100",
    icon: <CiCalendar className="text-[3.5rem] text-cyan-600" />,
    heading: "Chat Instantly",
    description:
      "Connect and chat with realtors in real-time for inquiries or updates.",
  },
  {
    iconcolor: "from-indigo-50 to-indigo-100",
    icon: <PiBuildingOfficeThin className="text-[3.5rem] text-indigo-600" />,
    heading: "Close the Deal",
    description:
      "Secure your ideal property with confidence through verified listings.",
  },
];

function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-40 px-32 bigtablet:px-10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-[5rem]">How Inspectra Works</h2>
          <p className="max-w-5xl text-[1.7rem] mx-auto">
            Our simple process makes finding and inspecting properties easier
            than ever before.
          </p>
        </div>

        <div className="grid grid-cols-4 bigmobile:grid-cols-2 smmobile:grid-cols-1 gap-8 bigmobile:gap-14">
          {method.map((el, index) => (
            <div key={index} className="text-center">
              <div
                className={`h-[7rem] w-[7rem] rounded-full bg-gradient-to-tr ${el.iconcolor} flex items-center justify-center mx-auto mb-4`}
              >
                {el.icon}
              </div>
              <h3 className="text-4xl font-semibold text-[#333] mb-4">
                {el.heading}
              </h3>
              <p className="text-[1.7rem]">{el.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// User Stories Section
// const stories = [
//   {
//     imgSrc: "https://mighty.tools/mockmind-api/content/human/80.jpg",
//     name: "Sarah Johnson",
//     role: "First-time Homebuyer",
//     quote:
//       "Inspectra made finding my first home so much easier than I expected. The verified listings gave me confidence, and booking inspections was seamless. I found my dream apartment in just two weeks!",
//     rating: 3,
//   },
//   {
//     imgSrc: "https://mighty.tools/mockmind-api/content/human/112.jpg",
//     name: "Michael Rodriguez",
//     role: "Real Estate Investor",
//     quote:
//       "As someone who deals with multiple properties, Inspectra has been a game-changer. The verification process saves me countless hours of due diligence, and the platform connects me with serious sellers.",
//     rating: 5,
//   },
//   {
//     imgSrc: "https://mighty.tools/mockmind-api/content/human/102.jpg",
//     name: "Jennifer Chen",
//     role: "Realtor",
//     quote:
//       "Since joining Inspectra as a realtor, my client base has grown by 40%. The platform's verification process gives my listings credibility, and the inspection booking system saves me hours of coordination.",
//     rating: 4,
//   },
// ];

// function StoriesSection() {
//   return (
//     <section className="py-40 px-32 bigtablet:px-10 bg-white">
//       <div className="container">
//         <div className="text-center mb-16">
//           <h2 className="heading-2 text-[5rem]">What Our Users Say</h2>
//           <p className="text-[1.7rem] max-w-5xl mx-auto">
//             Don&apos;t just take our word for it. Here&apos;s what property
//             seekers and realtors have to say about Inspectra.
//           </p>
//         </div>

//         <div className="grid grid-cols-3 bigmobile:grid-cols-1 gap-8">
//           {/* Testimonial 1 */}
//           {stories.map((el, index) => (
//             <div
//               key={index}
//               className="border-l border-r rounded-2xl p-16 smtablet:p-10"
//             >
//               <div className="flex items-center mb-12">
//                 <div className="mr-8 w-[8rem] h-[8rem] bg-blue-300 rounded-full overflow-hidden ring-2 ring-offset-2 ring-blue-200 flex-shrink-0">
//                   <img
//                     src={el.imgSrc}
//                     alt="User A Image"
//                     className="w-full h-full"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="text-3xl font-semibold text-[#333]">
//                     {el.name}
//                   </h4>
//                   <p>{el.role}</p>
//                 </div>
//               </div>
//               <p className="italic mb-12">&quot;{el.quote}&quot;</p>
//               <div className="flex text-blue-500">
//                 {[...Array(el.rating)].map((_, i) => (
//                   <FaStar key={i} className="text-[2rem] mr-2" />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link
//             href="#"
//             className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
//           >
//             Read More Success Stories
//             <MdKeyboardDoubleArrowRight className="ml-2 text-[1.7rem]" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// FAQs Section

export function FAQsSection({ FAQs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-40 px-32 bigtablet:px-10 bg-gradient-to-tr from-sky-100 to-blue-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-[5rem]">Frequently Asked Questions</h2>
          <p className="text-[1.7rem] max-w-5xl mx-auto">
            Find answers to common questions about Inspectra and how it works.
          </p>
        </div>

        <div className="max-w-[90rem] mx-auto">
          {/* FAQ Item 1 */}
          <div className="space-y-6">
            {FAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="flex justify-between items-center w-full text-left p-10 text-lg font-medium text-blue-700 transition-colors duration-300"
                  >
                    {faq.question}
                    <span
                      className={`transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      } text-blue-600`}
                    >
                      <MdOutlineKeyboardDoubleArrowDown />
                    </span>
                  </button>
                  <div
                    className={`px-6 text-blue-900 transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen
                        ? "max-h-96 opacity-100 py-6"
                        : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="#"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Have more questions? Contact our support team
          </Link>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 smmobile:px-8 bg-gradient-to-tr from-sky-300 to-cyan-500">
      <div className="container">
        <div className="max-w-9xl mx-auto text-center text-white">
          <h2 className="text-7xl smmobile:text-6xl font-bold mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-blue-50 mb-8">
            Join thousands of satisfied users who have found their dream
            properties through Inspectra.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variation="link" link="/listings">
              Browse Properties
            </Button>
            <Button variation="link" link="/sign-up">
              For Realtors & Agencies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
