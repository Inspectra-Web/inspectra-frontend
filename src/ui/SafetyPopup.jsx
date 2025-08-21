import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function SafetyPopup({ showPopup, onClose }) {
  const [shouldRender, setShouldRender] = useState(showPopup);

  useEffect(() => {
    if (showPopup) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300);

      return () => clearTimeout(timeout);
    }
  }, [showPopup]);

  if (!shouldRender) return null;
  return (
    <div
      className={`fixed inset-0 z-50 px-8 smmobile:px-0 smmobile:overflow-y-auto smmobile:flex-none flex items-center justify-center bg-black bg-opacity-50`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl shadow-xl max-w-7xl w-full p-12 space-y-8 smmobile:px-6 smmobile:py-12 smmobile:rounded-none`}
      >
        <h2 className="text-5xl text-gray-800 flex items-center justify-between gap-10 smmobile:mt-6">
          🔐 Your Safety Matters{" "}
          <button
            onClick={onClose}
            className="text-5xl text-gray-500 hover:text-red-500 transition-colors"
          >
            <IoClose />
          </button>
        </h2>

        <div className="space-y-2 text-3xl font-normal text-slate-500">
          <p className="mb-10 leading-10">
            At <strong>Inspectra</strong>, we are committed to creating a safe
            and trustworthy platform for property seekers.
          </p>
          <ul className="pl-5 pb-10 space-y-8">
            <li>✅ We verify agents before they can post listings.</li>
            <li>🕵️ Listings are manually reviewed for authenticity.</li>
            <li>
              📅 Schedule property inspections securely through the platform.
            </li>
            <li>💬 Use our live chat to speak directly with agents.</li>
            <li>⭐ Read and leave reviews about your experience.</li>
          </ul>
        </div>

        <div className="border-t pt-20 font-normal text-2xl text-gray-600 space-y-2">
          <p className="text-4xl font-medium text-red-600">
            ⚠️ Important Reminder
          </p>
          <p>
            While Inspectra works hard to verify agents and review listings, we
            encourage you to always inspect properties in person before making
            payments. Please report any suspicious activity so we can take
            immediate action.
          </p>
          <p>
            By using Inspectra, you agree to our{" "}
            <Link to="/terms" className="text-blue-600 underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
