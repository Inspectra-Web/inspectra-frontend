import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function GoBackBtn({ marginB = "mb-14" }) {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <button
      onClick={handleGoBack}
      className={`flex items-center gap-3 ${marginB} font-medium text-blue-500`}
    >
      <HiArrowLeft /> <span>Go back</span>
    </button>
  );
}
