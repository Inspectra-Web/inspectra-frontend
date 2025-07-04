import {
  HiOutlineViewfinderCircle,
  HiOutlineHomeModern,
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineWrenchScrewdriver,
  HiOutlineBuildingOffice2,
  HiOutlineQrCode,
  HiArrowUturnLeft,
  HiOutlineUserGroup,
  HiOutlineCursorArrowRipple,
  // HiOutlineUser,
} from "react-icons/hi2";
import SideNavItem from "./SideNavItem";
import Logo from "./Logo";
import { HiMenuAlt1, HiOutlineCalendar } from "react-icons/hi";
import { useClickOutside } from "../hooks/useClickOutside";
import { useLogout, useUser } from "../hooks/useAuth";
import { LoaderLg } from "../static/Loaders";
import { IoChatbubblesOutline, IoSettingsOutline } from "react-icons/io5";
import {
  useViewClientInquiries,
  useViewRealtorInquiries,
} from "../hooks/useInquiry";
import {
  useViewClientInspectionSchedules,
  useViewRealtorInspectionSchedules,
} from "../hooks/useSchedule";
import { GoCreditCard, GoMail } from "react-icons/go";
import { CiMoneyBill, CiViewList } from "react-icons/ci";
import { MdOutlineHomeWork } from "react-icons/md";
import { BsCardList } from "react-icons/bs";

export default function Sidebar({ slideIn, onToggleSidebar }) {
  const { user } = useUser();
  const { isPending: isSearching, inquiries } = useViewClientInquiries({
    sort: "",
  });
  const { isPending: isInquiring, inquiries: inquiriesData } =
    useViewRealtorInquiries({
      sort: "",
    });
  const { isPending: isLoading, schedules } = useViewRealtorInspectionSchedules(
    { sort: "" }
  );
  const { isPending: isInspecting, schedules: scheduleData } =
    useViewClientInspectionSchedules({ sort: "" });
  const { logout, isPending } = useLogout();
  const sidebarRef = useClickOutside(() => onToggleSidebar(false), slideIn);

  return (
    <>
      {isPending && <LoaderLg />}
      <aside
        ref={sidebarRef}
        className={`bg-slate-900 overflow-auto sticky top-0 left-0 h-full basis-[27rem] z-[1000] text-sm p-10 text-white ${
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
        {user?.role === "client" ? (
          <ul className="flex flex-col gap-5">
            {/* <h4 className="heading-4">main</h4> */}
            <SideNavItem
              href="/client/dashboard"
              icon={<HiOutlineViewfinderCircle />}
              label="Dashboard"
              onClick={() => onToggleSidebar(false)}
            />
            <SideNavItem
              href="/client/settings"
              icon={<IoSettingsOutline />}
              label="User Settings"
              onClick={() => onToggleSidebar(false)}
            />
            {/* <SideNavItem
              href="/client/reviews"
              icon={<LuMessageCircle />}
              label="My Reviews"
              onClick={() => onToggleSidebar(false)}
            /> */}

            <h4 className="heading-4">activity</h4>
            <SideNavItem
              href="/client/inquiries"
              icon={<GoMail />}
              label={
                <p className="flex justify-between items-center gap-10">
                  <span>Inquiries</span>{" "}
                  <span
                    className={`w-10 h-10 ${
                      isSearching || !inquiries?.length
                        ? "bg-rose-500"
                        : "bg-green-500"
                    } text-white p-4 text-[1.2rem] flex items-center justify-center rounded-full`}
                  >
                    {isSearching ? 0 : inquiries?.length}
                  </span>
                </p>
              }
              onClick={() => onToggleSidebar(false)}
            />
            <SideNavItem
              href="/client/schedules"
              icon={<HiOutlineCalendar />}
              label={
                <p className="flex justify-between items-center gap-10">
                  <span>Inspections</span>{" "}
                  <span
                    className={`w-10 h-10 ${
                      isInspecting || !scheduleData?.length
                        ? "bg-red-500"
                        : "bg-emerald-500"
                    } text-white p-4 text-[1.2rem] flex items-center justify-center rounded-full`}
                  >
                    {isInspecting ? 0 : scheduleData?.length}
                  </span>
                </p>
              }
              onClick={() => onToggleSidebar(false)}
            />

            {/* <SideNavItem
            href="/help"
            icon={<HiOutlineRocketLaunch />}
            label="Help / Support"
            onClick={() => onToggleSidebar(false)}
          /> */}
            {inquiries?.length > 0 && (
              <SideNavItem
                href="/client/live-chat"
                icon={<IoChatbubblesOutline />}
                label="Messages"
                onClick={() => onToggleSidebar(false)}
              />
            )}

            <h4 className="heading-4">property</h4>
            <SideNavItem
              href="/listings"
              icon={<HiOutlineHome />}
              label="Search Listings"
              onClick={() => onToggleSidebar(false)}
            />
            <SideNavItem
              href="/top-listings"
              icon={<HiOutlineHomeModern />}
              label="Top Listings"
              onClick={() => onToggleSidebar(false)}
            />
            {/* <SideNavItem
              href="/client/favourites"
              icon={<RiHomeHeartLine />}
              label="Saved Properties"
              onClick={() => onToggleSidebar(false)}
            /> */}
            {/* <h4 className="heading-4">realtors</h4>
            <SideNavItem
              href="/realtors"
              icon={<HiOutlineUser />}
              label="Browse Realtors"
              onClick={() => onToggleSidebar(false)}
            /> */}
          </ul>
        ) : (
          <ul className="flex flex-col gap-5">
            <SideNavItem
              href="/app/overview"
              icon={<HiOutlineViewfinderCircle />}
              label="Overview"
              onClick={() => onToggleSidebar(false)}
            />

            <h4 className="heading-4">prospects</h4>

            <SideNavItem
              href="/app/inquiries"
              icon={<GoMail />}
              label={
                <p className="flex justify-between items-center gap-10">
                  <span>Inquiries</span>{" "}
                  <span
                    className={`w-10 h-10 ${
                      isInquiring || !inquiriesData?.length
                        ? "bg-rose-500"
                        : "bg-green-500"
                    } text-white p-4 text-[1.2rem] flex items-center justify-center rounded-full`}
                  >
                    {isInquiring ? 0 : inquiriesData?.length}
                  </span>
                </p>
              }
              onClick={() => onToggleSidebar(false)}
            />
            <SideNavItem
              href="/app/schedules"
              icon={<HiOutlineCalendar />}
              label={
                <p className="flex justify-between items-center gap-10">
                  <span>Schedules</span>{" "}
                  <span
                    className={`w-10 h-10 ${
                      isLoading || !schedules?.length
                        ? "bg-red-500"
                        : "bg-emerald-500"
                    } text-white p-4 text-[1.2rem] flex items-center justify-center rounded-full`}
                  >
                    {isLoading ? 0 : schedules?.length}
                  </span>
                </p>
              }
              onClick={() => onToggleSidebar(false)}
            />
            {/* <SideNavItem
            href="/help"
            icon={<HiOutlineRocketLaunch />}
            label="Help / Support"
            onClick={() => onToggleSidebar(false)}
          /> */}
            {inquiriesData?.length > 0 && (
              <SideNavItem
                href="/app/live-chat"
                icon={<IoChatbubblesOutline />}
                label="Live Chat"
                onClick={() => onToggleSidebar(false)}
              />
            )}
            <h4 className="heading-4">property</h4>
            <SideNavItem
              href="/app/add-property"
              icon={<HiOutlineHome />}
              label="Add Property"
              onClick={() => onToggleSidebar(false)}
            />
            <SideNavItem
              href="/app/property-listings"
              icon={<HiOutlineHomeModern />}
              label="My Listings"
              onClick={() => onToggleSidebar(false)}
            />

            <h4 className="heading-4">profile</h4>
            <SideNavItem
              href="/app/profile"
              icon={<HiOutlineUserCircle />}
              label="Profile Details"
              onClick={() => onToggleSidebar(false)}
            />
            <SideNavItem
              href="/app/profile-settings"
              icon={<HiOutlineWrenchScrewdriver />}
              label="Profile Settings"
              onClick={() => onToggleSidebar(false)}
            />
            <SideNavItem
              href="/app/profile-verification"
              icon={<HiOutlineQrCode />}
              label="Verification"
              onClick={() => onToggleSidebar(false)}
            />
            <h4 className="heading-4">payments</h4>
            <SideNavItem
              href="/app/subscription-history"
              icon={<GoCreditCard />}
              label="Subscriptions"
              onClick={() => onToggleSidebar(false)}
            />
            <SideNavItem
              href="/pricings"
              icon={<CiMoneyBill />}
              label="Pricing Plans"
              onClick={() => onToggleSidebar(false)}
            />
            {user?.role === "admin" && (
              <>
                <SideNavItem
                  href="/app/all-subscriptions"
                  icon={<BsCardList />}
                  label="All Subscriptions"
                  onClick={() => onToggleSidebar(false)}
                />
                <h4 className="heading-4">realtors</h4>
                {/* <SideNavItem
                href="/add-a-realtor"
                icon={<HiOutlineUserAdd />}
                label="Add Realtor"
                onClick={() => onToggleSidebar(false)}
              /> */}
                <SideNavItem
                  href="/app/realtors-list"
                  icon={<HiOutlineUserGroup />}
                  label="Realtors"
                  onClick={() => onToggleSidebar(false)}
                />
                {/* <SideNavItem
                href="/verification-requests"
                icon={<HiFingerPrint />}
                label="Verify Requests"
                onClick={() => onToggleSidebar(false)}
              /> */}
                <h4 className="heading-4">properties</h4>
                <SideNavItem
                  href="/app/pending-properties"
                  icon={<HiOutlineCursorArrowRipple />}
                  label="Pending Listings"
                  onClick={() => onToggleSidebar(false)}
                />
                <SideNavItem
                  href="/app/all-property-listings"
                  icon={<HiOutlineBuildingOffice2 />}
                  label="All Listings"
                  onClick={() => onToggleSidebar(false)}
                />
                <h4 className="heading-4">inquiries / inspections</h4>
                <SideNavItem
                  href="/app/all-inquiries"
                  icon={<CiViewList />}
                  label="List of Inquiries"
                  onClick={() => onToggleSidebar(false)}
                />
                <SideNavItem
                  href="/app/all-scheduled-inspections"
                  icon={<MdOutlineHomeWork />}
                  label="Scheduled Inspections"
                  onClick={() => onToggleSidebar(false)}
                />
              </>
            )}
          </ul>
        )}

        <button
          disabled={isPending}
          onClick={() => {
            logout();
            // localStorage.removeItem("selectedChatRoomId");
          }}
          className="mt-10 text-red-500 flex items-center gap-5 transition-all hover:text-red-800"
        >
          <HiArrowUturnLeft />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
