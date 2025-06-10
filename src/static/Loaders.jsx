export function LoaderSm() {
  return <span className="loader-sm"></span>;
}

import logoImg from "../assets/inspectra-logo-primary-lg.png";
import ParticlesBg from "../components/ParticlesBg";

export function LoaderLg() {
  return (
    <div className="bg-slate-900 fixed top-0 left-0 h-[100vh] w-full text-white px-10 z-[100000] flex justify-center items-center">
      <ParticlesBg />

      <div className="flex flex-col items-center">
        <img src={logoImg} alt="Inspectra Primary Logo" className="h-36" />
        <span className="loader"></span>
      </div>
    </div>
  );
}

export function LoaderMd() {
  return (
    <div className="mx-auto bg-white shadow shadow-slate-200 rounded-2xl p-10 midmobile:p-5 h-screen flex justify-center items-center text-8xl text-slate-500 gap-10">
      <span className="loader-main"></span>
      Loading...
    </div>
  );
}
