import {
  HiFingerPrint,
  HiMenuAlt1,
  HiOutlineHome,
  HiOutlineUserAdd,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useClickOutside } from "../hooks/useClickOutside";
import Logo from "./Logo";
import SideNavItem from "./SideNavItem";
import {
  HiArrowUturnLeft,
  HiOutlineBuildingOffice2,
  HiOutlineCursorArrowRipple,
  HiOutlineHomeModern,
  HiOutlineQrCode,
  HiOutlineRocketLaunch,
  HiOutlineViewfinderCircle,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

export default function AdminSidebar({ slideIn, onToggleSidebar }) {
  const sidebarRef = useClickOutside(() => onToggleSidebar(false), slideIn);
  return (
    <aside
      ref={sidebarRef}
      className={`bg-slate-900 overflow-auto sticky top-0 left-0 h-full basis-[27rem] z-[100000000000000000000000000000000000000000000000000000] text-sm p-10 text-white ${
        slideIn ? "smtablet:translate-x-0" : "smtablet:-translate-x-full"
      } smtablet:-translate-x-full smtablet:fixed smtablet:w-[30rem] transition-all duration-300 ease-linear`}
    >
      <div className="mb-10 flex items-center justify-between">
        <Logo />
        <HiMenuAlt1
          className="icon hidden smtablet:block"
          onClick={() => onToggleSidebar(false)}
        />
      </div>
      <ul className="flex flex-col gap-5">
        <SideNavItem
          href="/"
          icon={<HiOutlineViewfinderCircle />}
          label="Overview"
          onClick={() => onToggleSidebar(false)}
        />
        <SideNavItem
          href="/help"
          icon={<HiOutlineRocketLaunch />}
          label="Help / Support"
          onClick={() => onToggleSidebar(false)}
        />
        <h4 className="heading-4">property</h4>
        <SideNavItem
          href="/add-property"
          icon={<HiOutlineHome />}
          label="Add Property"
          onClick={() => onToggleSidebar(false)}
        />
        <SideNavItem
          href="/property-listings"
          icon={<HiOutlineHomeModern />}
          label="Property Listings"
          onClick={() => onToggleSidebar(false)}
        />
        <SideNavItem
          href="/manage-property"
          icon={<HiOutlineBuildingOffice2 />}
          label="Manage Properties"
          onClick={() => onToggleSidebar(false)}
        />

        <h4 className="heading-4">profile</h4>
        <SideNavItem
          href="/profile"
          icon={<HiOutlineUserCircle />}
          label="Profile Details"
          onClick={() => onToggleSidebar(false)}
        />
        <SideNavItem
          href="/profile-settings"
          icon={<HiOutlineWrenchScrewdriver />}
          label="Profile Settings"
          onClick={() => onToggleSidebar(false)}
        />
        <SideNavItem
          href="/profile-verification"
          icon={<HiOutlineQrCode />}
          label="Verification"
          onClick={() => onToggleSidebar(false)}
        />
        <h4 className="heading-4">realtors</h4>
        <SideNavItem
          href="/admin/add-a-realtor"
          icon={<HiOutlineUserAdd />}
          label="Add Realtor"
          onClick={() => onToggleSidebar(false)}
        />
        <SideNavItem
          href="/admin/realtors-list"
          icon={<HiOutlineUserGroup />}
          label="Realtors"
          onClick={() => onToggleSidebar(false)}
        />
        <SideNavItem
          href="/admin/verification-requests"
          icon={<HiFingerPrint />}
          label="Verify Requests"
          onClick={() => onToggleSidebar(false)}
        />
        <h4 className="heading-4">properties</h4>
        <SideNavItem
          href="/admin/pending-properties"
          icon={<HiOutlineCursorArrowRipple />}
          label="Pending Listings"
          onClick={() => onToggleSidebar(false)}
        />
        <SideNavItem
          href="/admin/all-property-listings"
          icon={<HiOutlineBuildingOffice2 />}
          label="All Listings"
          onClick={() => onToggleSidebar(false)}
        />
      </ul>
      <button className="mt-10 text-red-500 flex items-center gap-5 transition-all hover:text-red-800">
        <HiArrowUturnLeft />
        <span>Logout</span>
      </button>
    </aside>
  );
}
