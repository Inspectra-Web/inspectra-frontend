export default function MainContainer({ children }) {
  return (
    <main className="flex justify-center relative bg-slate-900 h-screen pt-3 pr-3 mx-auto max-w-[160rem]">
      {children}
    </main>
  );
}
