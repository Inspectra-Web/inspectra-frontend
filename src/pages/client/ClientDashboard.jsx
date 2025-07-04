import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ScrollToTop from "../../components/ScrollToTop";
import { useState } from "react";
import MainContainer from "../../components/MainContainer";
import ClientHeader from "./ClientHeader";

export default function ClientDashboard() {
  const [slideIn, setSlideIn] = useState(false);
  const handleToggleSidebar = () => setSlideIn((prev) => !prev);

  return (
    <>
      <ScrollToTop containerSelector=".client-dashboard" />
      <MainContainer>
        <Sidebar slideIn={slideIn} onToggleSidebar={handleToggleSidebar} />

        <div className="bg-slate-50 flex-1 rounded-t-3xl h-full overflow-auto client-dashboard">
          <ClientHeader onToggleSidebar={handleToggleSidebar} />

          <div className="px-16 py-7 bigmobile:px-5">
            <Outlet />
          </div>
        </div>
      </MainContainer>
    </>
  );
}
