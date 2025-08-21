import { Link } from "react-router-dom";

export default function Button({
  variation = "button",
  disabled,
  link,
  labelFor,
  onClick,
  children,
  color = "from-blue-500 to-blue-700 ring-blue-300",
}) {
  if (variation === "bordered")
    return (
      <Link
        to={link}
        className="border border-blue-300 hover:border-blue-500 flex focus:ring-4 ring-offset-2 items-center gap-3 px-10 py-10 rounded-full bg-left hover:bg-right transition-all duration-500 ease cursor-pointer"
      >
        {children}
      </Link>
    );
  if (variation === "link")
    return (
      <Link
        to={link}
        className={`flex focus:ring-4 ring-offset-2 items-center gap-3 px-10 py-10 rounded-full text-white bg-gradient-to-tr from-blue-500 to-blue-700 bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease cursor-pointer ${color}`}
      >
        {children}
      </Link>
    );

  if (variation === "label")
    return (
      <label
        onClick={onClick}
        htmlFor={labelFor}
        tabIndex="0"
        className="flex focus:ring-4 ring-offset-2 items-center gap-3 px-16 py-10 rounded-full text-white bg-gradient-to-tr from-blue-500 to-blue-700 bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease cursor-pointer"
      >
        {children}
      </label>
    );

  if (variation === "delete")
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex focus:ring-4 justify-center ring-red-300 ring-offset-2 items-center gap-3 px-10 py-10 rounded-full text-white bg-gradient-to-tr from-red-500 to-red-700 bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease cursor-pointer"
      >
        {children}
      </button>
    );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex focus:ring-4 ring-offset-2 items-center gap-3 px-16 py-10 rounded-full text-white bg-gradient-to-tr ${color} bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease justify-center cursor-pointer`}
    >
      {children}
    </button>
  );
}
