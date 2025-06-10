export function FormFieldHolder({ label, error, children }) {
  return (
    <div className="my-14">
      <label
        htmlFor={children.props.id}
        className="text-slate-500 capitalize italic font-semibold mb-5 inline-block"
      >
        <span>{label}</span> <span className="text-blue-500">*</span>
      </label>
      {children}
      {error && (
        <span className="text-rose-500 mt-2 inline-block">{error}</span>
      )}
    </div>
  );
}
