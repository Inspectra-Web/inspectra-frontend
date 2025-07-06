export function Form({ heading, description, onSubmit, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-[50rem] my-20 smmobile:px-10"
    >
      <div className="text-white text-center flex flex-col items-center">
        <h1 className="font-bold text-6xl mb-3">{heading}</h1>
        <p className="text-2xl w-[65%] smmobile:w-[90%]">{description}</p>
      </div>
      {children}
    </form>
  );
}
