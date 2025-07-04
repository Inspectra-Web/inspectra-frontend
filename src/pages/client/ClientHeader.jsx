import { HiMenuAlt1 } from "react-icons/hi";
import { HiArrowUturnLeft } from "react-icons/hi2";
import Button from "../../components/Button";
import { useLogout, useUser } from "../../hooks/useAuth";
import { useReadProfile } from "../../hooks/useProfile";
import { Link } from "react-router-dom";
import { defaultAvatar } from "../../helpers/helpers";
import { CiSearch } from "react-icons/ci";

export default function ClientHeader({ onToggleSidebar }) {
  const { user } = useUser();
  const { profile } = useReadProfile(user?.profile);
  const { logout, isPending } = useLogout();
  const name = user?.fullname?.split(" ");

  return (
    <header className="sticky top-0 left-0 bg-white shadow-md shadow-slate-200 h-36 px-16 py-7 flex items-center justify-between z-[999] bigmobile:px-5">
      <div className="flex items-center gap-10">
        <HiMenuAlt1 className="icon" onClick={onToggleSidebar} />
        <h2 className="heading-2 midmobile:hidden capitalize">
          Welcome {name?.[0]}!
        </h2>
      </div>
      <div className="flex items-center gap-10">
        {/* <div className="bg-slate-200 h-16 rounded-full flex items-center gap-3 px-6 py-2">
          <input
            type="text"
            className="bg-transparent h-full outline-none"
            placeholder="Search properties..."
          />
          <HiOutlineMagnifyingGlass className="text-lg text-slate-500 cursor-pointer" />
        </div> */}
        <Button variation="link" link="/listings">
          <span className="bigmobile:hidden">Listings</span>
          <CiSearch size={24} className="bigmobile:-rotate-90" />
        </Button>
        {/* <BiFullscreen className="icon" /> */}
        {/* <div className="relative">
          <HiOutlineBell className="icon" />
          <span className="absolute -top-1 -right-2 p-2 text-[1rem] font-bold flex items-center justify-center rounded-full bg-red-300 text-white">
            12
          </span>
        </div> */}
        <Link to="/client/settings" className="flex items-center gap-5">
          <img
            src={profile?.avatar || defaultAvatar(profile?.gender)}
            className="w-[7rem] h-[7rem] rounded-full cursor-pointer"
          />
          <div className="bigmobile:hidden">
            <p className="capitalize font-semibold text-slate-700">
              {name?.[0]} {name?.[1]}
            </p>
            <p className="text-sm uppercase mt-2 text-slate-400 italic">
              {user?.role}
            </p>
          </div>
        </Link>
        <button
          disabled={isPending}
          onClick={() => {
            logout();
            // localStorage.removeItem("selectedChatRoomId");
          }}
          className="text-red-500 transition-all hover:text-red-800 w-16 h-16 flex items-center justify-center bg-red-50 hover:bg-red-100 rounded-full"
        >
          <HiArrowUturnLeft />
        </button>
      </div>
    </header>
  );
}
