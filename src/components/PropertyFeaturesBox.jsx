export default function PropertyFeaturesBox({
  featureText,
  numberText,
  icon,
  unit,
  hover = true,
}) {
  return (
    <div
      className={`${
        hover ? "bg-sky-50 hover:bg-white py-6 px-8" : ""
      } transition-all duration-300 capitalize rounded-xl`}
    >
      <span className="font-medium text-slate-500 mb-3 inline-block">
        {featureText}
      </span>
      <div className="flex items-center gap-3">
        {icon}
        <span>{numberText}</span>
        <span className="text-slate-500 italic text-xl">{unit}</span>
      </div>
    </div>
  );
}

export function MinFeaturesBox({ icon, label, unit }) {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      {icon}
      <span className="text-[14px]">{label}</span>
      <span className="text-[12px]">{unit}</span>
    </div>
  );
}
