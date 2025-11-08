import { HiOutlineCheckCircle } from "react-icons/hi";

export default function PropertyAmenitiesList({ label }) {
  return (
    <li className="flex gap-3 items-center text-slate-600">
      <HiOutlineCheckCircle
        size={24}
        className="text-blue-500 flex-shrink-0 self-center"
      />
      <span>{label}</span>
    </li>
  );
}
