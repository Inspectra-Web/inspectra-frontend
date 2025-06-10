import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function SafetyPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-8">
      <div className="bg-white rounded-3xl shadow-xl max-w-7xl w-full p-12 space-y-8 relative">
        <h2 className="text-5xl text-gray-800">🔐 Your Safety Matters</h2>

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
          <p className="text-4xl font-medium text-red-600">⚠️ Disclaimer</p>
          <p>
            Inspectra does not guarantee the authenticity of every listing or
            agent. Always inspect properties before making payments and report
            suspicious activity.
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

        <button
          onClick={onClose}
          className="absolute top-3 right-10 text-5xl text-gray-500 hover:text-red-500 transition-colors"
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
}
