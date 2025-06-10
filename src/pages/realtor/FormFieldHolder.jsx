export function FormFieldHolder({ label, error, children }) {
  return (
    <div className={`flex flex-col gap-2`}>
      <label
        htmlFor={children.props.id}
        className="text-slate-500 font-semibold"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
