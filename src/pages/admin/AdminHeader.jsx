import { HiMenuAlt1 } from "react-icons/hi";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import Button from "../../components/Button";

export default function AdminHeader({ onToggleSidebar }) {
  return (
    <header className="sticky top-0 left-0 bg-white shadow-md shadow-slate-200 h-32 px-16 py-7 flex items-center justify-between z-[1000] bigmobile:px-5">
      <div className="flex items-center gap-10">
        <HiMenuAlt1 className="icon" onClick={onToggleSidebar} />
        <h2 className="heading-2 midmobile:hidden">Welcome Franklin!</h2>
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
        <Button variation="link" link="/add-property">
          <span className="bigmobile:hidden">Add Listing</span>
          <HiOutlinePaperAirplane size={24} className="bigmobile:-rotate-90" />
        </Button>
        {/* <BiFullscreen className="icon" /> */}
        {/* <div className="relative">
          <HiOutlineBell className="icon" />
          <span className="absolute -top-1 -right-2 p-2 text-[1rem] font-bold flex items-center justify-center rounded-full bg-red-300 text-white">
            12
          </span>
        </div> */}
        <div className="flex items-center gap-5">
          <img
            src="https://techzaa.in/lahomes/admin/assets/images/users/avatar-1.jpg"
            className="w-[4.8rem] rounded-full cursor-pointer"
          />
          <div className="bigmobile:hidden">
            <p className="capitalize font-semibold text-slate-700">
              franklin chidera
            </p>
            <p className="text-sm uppercase mt-2 text-slate-400 italic">
              admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
