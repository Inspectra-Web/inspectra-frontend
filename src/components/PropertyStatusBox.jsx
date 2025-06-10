export default function PropertyStatusBox({ label, maxLabel, icon }) {
  return (
    <div className="bg-white shadow shadow-slate-200 p-10 rounded-xl flex justify-between items-center gap-5 midmobile:p-5">
      <div>
        <h4 className="text-slate-500 mb-5 font-medium">{label}</h4>
        <p className="font-bold text-xlg text-slate-700">{maxLabel}</p>
      </div>
      {icon}
    </div>
  );
}
