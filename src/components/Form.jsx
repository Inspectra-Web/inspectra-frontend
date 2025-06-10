export default function Form({ onSubmit, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-10 rounded-2xl shadow-md smtablet:p-5"
    >
      {children}
    </form>
  );
}
