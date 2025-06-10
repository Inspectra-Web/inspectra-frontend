import { Link } from "react-router-dom";
import IntroHeading from "../../components/IntroHeading";

const verificationRequests = [
  {
    id: 1,
    name: "John Emeka",
    document: "government-issued-id",
    time: "12 mins ago",
    date: "24 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Amara Johnson",
    document: "utility-bill",
    time: "25 mins ago",
    date: "24 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Chinedu Obi",
    document: "passport",
    time: "40 mins ago",
    date: "23 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-3.jpg",
  },
  {
    id: 4,
    name: "Grace Onyeka",
    document: "national-id",
    time: "1 hour ago",
    date: "23 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-4.jpg",
  },
  {
    id: 5,
    name: "Ifeanyi Uche",
    document: "driver's-license",
    time: "2 hours ago",
    date: "22 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-5.jpg",
  },
  {
    id: 6,
    name: "Ngozi Chukwu",
    document: "utility-bill",
    time: "3 hours ago",
    date: "22 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-6.jpg",
  },
  {
    id: 7,
    name: "Michael Ade",
    document: "passport",
    time: "5 hours ago",
    date: "21 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-7.jpg",
  },
  {
    id: 8,
    name: "Linda Okafor",
    document: "national-id",
    time: "1 day ago",
    date: "21 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-8.jpg",
  },
  {
    id: 9,
    name: "Chima Okechukwu",
    document: "driver's-license",
    time: "2 days ago",
    date: "20 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-9.jpg",
  },
  {
    id: 10,
    name: "Ogechi Ike",
    document: "government-issued-id",
    time: "3 days ago",
    date: "19 Oct, 2024",
    photo: "https://techzaa.in/lahomes/admin/assets/images/users/avatar-10.jpg",
  },
];

export default function VerificationRequests() {
  return (
    <>
      <IntroHeading label="Verification Request Timeline" />
      <div className="grid gap-10">
        {verificationRequests.map((request) => (
          <Link
            key={request.id}
            className="text-[1.5rem] flex items-center justify-between gap-5 bg-white text-slate-500 p-5 rounded-2xl border-l-4 border-blue-200 shadow-sm"
          >
            <div className="flex gap-5">
              <img
                src={request.photo}
                alt={`Preview of ${request.name}`}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <p className="font-semibold text-slate-700 text-bt">
                  {request.name}
                </p>
                <p>
                  Attachment was sent for review{" "}
                  <span className="inline-block bg-blue-50 text-blue-500 font-semibold -skew-x-6 px-2 py-1 rounded-xl">
                    {request.document}
                  </span>{" "}
                  for realtor verification.
                </p>
                <span>{request.time}</span>
              </div>
            </div>
            <div className="text-xl px-2 py-1 text-center bg-slate-100 rounded-xl font-semibold">
              {request.date}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          type="button"
          className="inline-flex items-center px-10 py-5 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed"
          disabled=""
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </button>
      </div>
    </>
  );
}
