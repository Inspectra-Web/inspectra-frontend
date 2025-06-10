export function Container({ children }) {
  return (
    <main className="bg-slate-900 z-10 relative h-[100vh] overflow-auto px-10">
      {children}
    </main>
  );
}
