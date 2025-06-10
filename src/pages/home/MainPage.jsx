import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../../components/ScrollToTop";

export default function MainPage() {
  return (
    <>
      <main className="mainpage text-slate-500 max-w-[170rem] h-screen mx-auto overflow-auto">
        <Header />
        <Outlet />
        <Footer />
        <ScrollToTop containerSelector=".mainpage" />
      </main>
    </>
  );
}
