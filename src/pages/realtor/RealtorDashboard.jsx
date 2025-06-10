import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import RealtorHeader from "./RealtorHeader";
import ScrollToTop from "../../components/ScrollToTop";
import { useState } from "react";
import MainContainer from "../../components/MainContainer";

export default function RealtorDashboard() {
  const [slideIn, setSlideIn] = useState(false);
  const handleToggleSidebar = () => setSlideIn((prev) => !prev);

  return (
    <>
      <ScrollToTop containerSelector=".realtor-dashboard" />
      <MainContainer>
        <Sidebar slideIn={slideIn} onToggleSidebar={handleToggleSidebar} />

        <div className="bg-slate-50 flex-1 rounded-t-3xl h-full overflow-auto realtor-dashboard">
          <RealtorHeader onToggleSidebar={handleToggleSidebar} />
          <div className="px-16 py-7 bigmobile:px-5">
            <Outlet />
          </div>
        </div>
      </MainContainer>
    </>
  );
}
