import { HiOutlineCheckCircle } from "react-icons/hi";

export default function PropertyAmenitiesList({ label }) {
  return (
    <li className="flex items-center gap-3 text-slate-600">
      <HiOutlineCheckCircle size={24} className="text-blue-500" />
      <span>{label}</span>
    </li>
  );
}
