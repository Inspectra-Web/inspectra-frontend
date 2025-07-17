import {
  HiArrowPath,
  HiFingerPrint,
  HiOutlineArchiveBox,
  HiOutlineDocumentDuplicate,
  HiOutlineEnvelopeOpen,
  // HiOutlineEnvelopeOpen,
  // HiOutlineEye,
  HiOutlineHomeModern,
  HiOutlineKey,
  HiOutlineLockOpen,
  HiOutlineUserGroup,
  HiOutlineXCircle,
} from "react-icons/hi2";
import PropertyStatusBox from "../../components/PropertyStatusBox";
import IntroHeading from "../../components/IntroHeading";
import { useGetStatistics } from "../../hooks/useAdmin";
import { LoaderMd } from "../../static/Loaders";
import { TbFingerprintOff } from "react-icons/tb";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import { useUser } from "../../hooks/useAuth";
import { useGetRealtorListings } from "../../hooks/useProperty";
import {
  getPropertyCountBylistingStatus,
  getPropertyCountByReviewStatus,
  // getTotalViews,
} from "../../helpers/helpers";
import { useReadProfile } from "../../hooks/useProfile";
import { Link } from "react-router-dom";
import { HiOutlineCalendar } from "react-icons/hi";
import { BsHouseDoor } from "react-icons/bs";

export default function Overview() {
  const { user } = useUser();
  const {
    isPending,
    propertyStats,
    realtorStats,
    inquiryStats,
    scheduleStats,
    // subscriptionStats,
  } = useGetStatistics();

  const { isLoading, properties } = useGetRealtorListings();
  const { isPending: isSearching, profile } = useReadProfile(user?.profile);

  if (!propertyStats && !realtorStats && !inquiryStats && !properties)
    return <LoaderMd />;

  const approvedCount = getPropertyCountByReviewStatus(properties, "approved");
  const pendingCount = getPropertyCountByReviewStatus(properties, "pending");
  const rejectedCount = getPropertyCountByReviewStatus(properties, "rejected");
  const saleCount = getPropertyCountBylistingStatus(properties, "sale");
  const rentCount = getPropertyCountBylistingStatus(properties, "rent");
  const leaseCount = getPropertyCountBylistingStatus(properties, "lease");
  const shortletCount = getPropertyCountBylistingStatus(properties, "shortlet");

  function padValue(value) {
    if (value === 0) return 0;
    return value?.toLocaleString().padStart(2, 0);
  }

  if (isPending || isLoading || isSearching) return <LoaderMd />;

  return (
    <>
      {!profile?.verified && (
        <p
          className={`mb-10 p-8 bg-gradient-to-t from-rose-400 to-rose-600 text-white text-center rounded-3xl`}
        >
          You are not yet verified. Kindly update your profile in the{" "}
          <Link to="/app/profile-settings" className="uppercase underline">
            Profile Settings
          </Link>{" "}
          to be able to upload properties.
        </p>
      )}
      {user.plan === "Starter" && user.role !== "admin" && (
        <p className="mb-10 p-8 bg-gradient-to-t from-blue-50 to-sky-50 text-blue-600 text-center rounded-3xl">
          You&apos;re currently on the <strong>STARTER PLAN</strong>. This plan{" "}
          <em>does not include featured listings</em>, and has limited access to{" "}
          <em>map integration</em> and <em>agency features</em>. Upgrade to
          unlock more powerful tools and boost your real estate business!{" "}
          <Link
            to="/pricings"
            className="text-sky-600 underline font-semibold hover:no-underline ease-linear duration-300 hover:text-sky-900"
          >
            See Pricing Plans
          </Link>
        </p>
      )}
      {user.plan === "Professional" && user.role !== "admin" && (
        <p className="mb-10 p-8 bg-gradient-to-t from-green-50 to-emerald-50 text-green-700 text-center rounded-3xl">
          You&apos;re on the <strong>PROFESSIONAL PLAN</strong>. This plan gives
          you access to <em>featured listings</em>, <em>map integration</em>,
          and other essential tools to grow your real estate reach. To gain
          access to <em>agency creation</em>, <em>team collaboration</em>, and
          advanced analytics, consider upgrading to the{" "}
          <strong>AGENCY PLAN</strong>.{" "}
          <Link
            to="/pricings"
            className="text-emerald-600 underline font-semibold hover:no-underline ease-linear duration-300 hover:text-emerald-900"
          >
            See Pricing Plans
          </Link>
        </p>
      )}

      {user.role === "admin" && (
        <div className="mb-20">
          <IntroHeading label="Property Statistics" />{" "}
          {propertyStats && (
            <div className="grid grid-cols-4 gap-8 my-8 bigtablet:grid-cols-3 bigmobile:grid-cols-2 smmobile:grid-cols-1">
              <PropertyStatusBox
                icon={
                  <HiOutlineHomeModern className="text-[6rem] p-5 bg-gradient-to-tr from-sky-50 to-sky-200 text-sky-500 rounded-xl" />
                }
                label="Approved Listings"
                maxLabel={padValue(propertyStats?.approvedListings) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiOutlineXCircle className="text-[6rem] p-5 bg-gradient-to-tr from-red-50 to-red-200 text-red-500 rounded-xl" />
                }
                label="Rejected Listings"
                maxLabel={padValue(propertyStats?.rejectedListings) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiArrowPath className="text-[6rem] p-5 bg-gradient-to-tr from-yellow-50 to-yellow-200 text-yellow-500 rounded-xl" />
                }
                label="Pending Listings"
                maxLabel={padValue(propertyStats?.pendingListings) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiOutlineArchiveBox className="text-[6rem] p-5 bg-gradient-to-tr from-violet-50 to-violet-200 text-violet-500 rounded-xl" />
                }
                label="Total Listings"
                maxLabel={padValue(propertyStats?.totalListings) || "NIL"}
              />

              <PropertyStatusBox
                icon={
                  <HiOutlineKey className="text-[6rem] p-5 bg-gradient-to-tr from-green-50 to-green-200 text-green-500 rounded-xl" />
                }
                label="For Sale"
                maxLabel={padValue(propertyStats?.saleListings) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiOutlineLockOpen className="text-[6rem] p-5 bg-gradient-to-tr from-lime-50 to-lime-200 text-lime-500 rounded-xl" />
                }
                label="For Rent"
                maxLabel={padValue(propertyStats?.rentListings) || "NIL"}
              />

              <PropertyStatusBox
                icon={
                  <HiOutlineDocumentDuplicate className="text-[6rem] p-5 bg-gradient-to-tr from-cyan-50 to-cyan-200 text-cyan-500 rounded-xl" />
                }
                label="For Lease"
                maxLabel={padValue(propertyStats?.leaseListings) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <BsHouseDoor className="text-[6rem] p-5 bg-gradient-to-tr from-pink-50 to-pink-200 text-pink-500 rounded-xl" />
                }
                label="For Shortlet"
                maxLabel={padValue(propertyStats?.shortletListings) || "NIL"}
              />
              {/* <PropertyStatusBox
                icon={
                  <HiOutlineEye className="text-[6rem] p-5 bg-gradient-to-tr from-fuchsia-50 to-fuchsia-200 text-fuchsia-500 rounded-xl" />
                }
                label="Total Views"
                maxLabel={padValue(propertyStats?.totalViews) || "NIL"}
              /> */}
              <PropertyStatusBox
                icon={
                  <HiOutlineEnvelopeOpen className="text-[6rem] p-5 bg-gradient-to-tr from-orange-50 to-orange-200 text-orange-500 rounded-xl" />
                }
                label="Inquiries Received"
                maxLabel={padValue(inquiryStats?.totalInquiries) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiOutlineCalendar className="text-[6rem] p-5 bg-gradient-to-tr from-indigo-50 to-indigo-200 text-indigo-500 rounded-xl" />
                }
                label="Schedules"
                maxLabel={padValue(scheduleStats?.totalSchedules) || "NIL"}
              />
            </div>
          )}
          <br />
          <br />
          <IntroHeading label="Realtor Statistics" />
          {realtorStats && (
            <div className="grid grid-cols-4 gap-8 my-8 bigtablet:grid-cols-3 bigmobile:grid-cols-2 smmobile:grid-cols-1">
              <PropertyStatusBox
                icon={
                  <HiOutlineUserGroup className="text-[6rem] p-5 bg-gradient-to-tr from-slate-50 to-slate-200 text-slate-500 rounded-xl" />
                }
                label="Realtors"
                maxLabel={padValue(realtorStats?.totalRealtors) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiFingerPrint className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
                }
                label="Verified"
                maxLabel={padValue(realtorStats?.verifiedRealtors) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <TbFingerprintOff className="text-[6rem] p-5 bg-gradient-to-tr from-stone-50 to-stone-200 text-stone-500 rounded-xl" />
                }
                label="Not Verified"
                maxLabel={padValue(realtorStats?.notVerifiedRealtors) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <IoIosMale className="text-[6rem] p-5 bg-gradient-to-tr from-teal-50 to-teal-200 text-teal-500 rounded-xl" />
                }
                label="Male"
                maxLabel={padValue(realtorStats?.maleRealtors) || "NIL"}
              />

              <PropertyStatusBox
                icon={
                  <IoIosFemale className="text-[6rem] p-5 bg-gradient-to-tr from-pink-50 to-pink-200 text-pink-500 rounded-xl" />
                }
                label="Female"
                maxLabel={padValue(realtorStats?.femaleRealtors) || "NIL"}
              />
            </div>
          )}
        </div>
      )}
      {(user.role === "admin" || user.role === "realtor") && (
        <>
          <IntroHeading label="My Listings Stats" />
          {properties && (
            <div className="grid grid-cols-4 gap-8 my-8 bigtablet:grid-cols-3 bigmobile:grid-cols-2 smmobile:grid-cols-1">
              <PropertyStatusBox
                icon={
                  <HiOutlineHomeModern className="text-[6rem] p-5 bg-gradient-to-tr from-sky-50 to-sky-200 text-sky-500 rounded-xl" />
                }
                label="Approved Listings"
                maxLabel={padValue(approvedCount) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiOutlineXCircle className="text-[6rem] p-5 bg-gradient-to-tr from-red-50 to-red-200 text-red-500 rounded-xl" />
                }
                label="Rejected Listings"
                maxLabel={padValue(rejectedCount) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiArrowPath className="text-[6rem] p-5 bg-gradient-to-tr from-yellow-50 to-yellow-200 text-yellow-500 rounded-xl" />
                }
                label="Pending Listings"
                maxLabel={padValue(pendingCount) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiOutlineArchiveBox className="text-[6rem] p-5 bg-gradient-to-tr from-violet-50 to-violet-200 text-violet-500 rounded-xl" />
                }
                label="Total Listings"
                maxLabel={padValue(properties.length) || "NIL"}
              />

              <PropertyStatusBox
                icon={
                  <HiOutlineKey className="text-[6rem] p-5 bg-gradient-to-tr from-green-50 to-green-200 text-green-500 rounded-xl" />
                }
                label="For Sale"
                maxLabel={padValue(saleCount) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <HiOutlineLockOpen className="text-[6rem] p-5 bg-gradient-to-tr from-lime-50 to-lime-200 text-lime-500 rounded-xl" />
                }
                label="For Rent"
                maxLabel={padValue(rentCount) || "NIL"}
              />

              <PropertyStatusBox
                icon={
                  <HiOutlineDocumentDuplicate className="text-[6rem] p-5 bg-gradient-to-tr from-cyan-50 to-cyan-200 text-cyan-500 rounded-xl" />
                }
                label="For Lease"
                maxLabel={padValue(leaseCount) || "NIL"}
              />
              <PropertyStatusBox
                icon={
                  <BsHouseDoor className="text-[6rem] p-5 bg-gradient-to-tr from-pink-50 to-pink-200 text-pink-500 rounded-xl" />
                }
                label="For Shortlet"
                maxLabel={padValue(shortletCount) || "NIL"}
              />
              {/* <PropertyStatusBox
                icon={
                  <HiOutlineEye className="text-[6rem] p-5 bg-gradient-to-tr from-fuchsia-50 to-fuchsia-200 text-fuchsia-500 rounded-xl" />
                }
                label="Total Views"
                maxLabel={padValue(totalViewsCount) || "NIL"}
              /> */}
              {/* <PropertyStatusBox
                icon={
                  <HiOutlineEnvelopeOpen className="text-[6rem] p-5 bg-gradient-to-tr from-orange-50 to-orange-200 text-orange-500 rounded-xl" />
                }
                label="Inquiries Received"
                maxLabel={padValue(totalInquiriesCount) || "NIL"}
              /> */}
            </div>
          )}
        </>
      )}
    </>
  );
}
