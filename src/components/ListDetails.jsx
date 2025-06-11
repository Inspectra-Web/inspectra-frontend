export default function ListDetails({ title, details }) {
  return (
    <li className="flex capitalize text-slate-600 items-center gap-10 rounded-2xl p-5 midmobile:flex-col midmobile:items-start midmobile:gap-2">
      <span className="w-1/3 font-semibold smmobile:w-full">{title}:</span>
      <span className="w-4/6 uppercase">{details}</span>
    </li>
  );
}
