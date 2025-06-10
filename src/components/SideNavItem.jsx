import { NavLink } from "react-router-dom";

export default function SideNavItem({ href, icon, label, onClick }) {
  return (
    <li>
      <NavLink
        onClick={onClick}
        to={href}
        className={({ isActive }) =>
          `text-gray-400 relative flex items-center py-5 px-6 gap-5 rounded-md hover:text-white overflow-hidden transition-all
          
          after:bg-slate-700 after:absolute after:h-full after:left-0 after:transition-all after:rounded-md after:duration-700
          before:transition-all before:h-full before:content-[''] before:absolute before:left-0 before:bg-gradient-to-br before:from-sky-500 before:to-sky-800 before:w-1 before:z-10 before:duration-700 
          
          hover:after:w-full hover:before:translate-y-0 
          
          ${
            isActive
              ? "text-white after:w-full before:translate-y-0"
              : "after:w-0 before:translate-y-full"
          }`
        }
      >
        <span className="z-20 text-3xl">{icon}</span>
        <span className="z-20 flex-1">{label}</span>
      </NavLink>
    </li>
  );
}
