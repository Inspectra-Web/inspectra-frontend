import { Outlet } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import MainContainer from "../../components/MainContainer";
import AdminSidebar from "../../components/AdminSidebar";
import { useState } from "react";
import AdminHeader from "./AdminHeader";

export default function AdminDashboard() {
  const [slideIn, setSlideIn] = useState(false);
  const handleToggleSidebar = () => setSlideIn((prev) => !prev);
  return (
    <>
      <ScrollToTop containerSelector=".admin-dashboard" />
      <MainContainer>
        <AdminSidebar slideIn={slideIn} onToggleSidebar={handleToggleSidebar} />

        <div className="bg-slate-50 flex-1 rounded-t-3xl h-full overflow-auto admin-dashboard">
          <AdminHeader onToggleSidebar={handleToggleSidebar} />
          <div className="px-16 py-7 bigmobile:px-5">
            <Outlet />
          </div>
        </div>
      </MainContainer>
    </>
  );
}
