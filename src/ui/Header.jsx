import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export function Header({ description, link, label }) {
  return (
    <header className="flex justify-between smmobile:flex-col gap-5 bg-slate-900 py-10 items-center sticky top-0 text-white px-10">
      <Logo />
      <div className="">
        <span>{description}</span>{" "}
        <Link
          to={link}
          className="text-blue-500 hover:text-blue-400 transition-all duration-300 ease-linear"
        >
          {label}
        </Link>
      </div>
    </header>
  );
}
