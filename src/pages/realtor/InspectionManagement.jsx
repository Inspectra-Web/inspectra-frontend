import GoBackBtn from "../../components/GoBackBtn";
import IntroHeading from "../../components/IntroHeading";
import {
  HiOutlineCalendar,
  HiOutlineInformationCircle,
  HiOutlineUser,
  // HiOutlineXCircle,
} from "react-icons/hi";
import { TfiEmail } from "react-icons/tfi";
import { LuAlarmClock } from "react-icons/lu";
import Button from "../../components/Button";
import {
  useUpdateInspectionScheduleStatus,
  useViewInspectionScheduleDetails,
} from "../../hooks/useSchedule";
import { Link, useParams } from "react-router-dom";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import moment from "moment";
import { useUser } from "../../hooks/useAuth";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { getStatusColor } from "../../helpers/helpers";

export default function InspectionManagement() {
  const [status, setStatus] = useState("");
  const { user } = useUser();
  const { inspectionId } = useParams();
  const { isPending, schedule } =
    useViewInspectionScheduleDetails(inspectionId);
  const { isPending: isUpdating, updateStatus } =
    useUpdateInspectionScheduleStatus();

  if (isPending && !schedule) return <LoaderMd />;

  // Parse the inspection data
  const inspectionData = {
    propertyName: schedule.property.title,
    propertySlug: schedule.property.slug,
    propertyID: schedule.property._id,
    clientName: schedule.clientName,
    clientEmail: schedule.clientEmail,
    realtorId: schedule.realtor.profile,
    realtorName: schedule.realtor.fullname,
    realtorEmail: schedule.realtor.email,
    message: schedule.message,
    scheduleDate: schedule.scheduleDate, // January 18, 2026
    status: schedule.status,
    inspectionFee: schedule.inspectionFee,
    platformCommission: schedule.platformCommission,
    totalPaid: schedule.totalPaid,
    isPaid: schedule.isPaid,
    isRealtorPaid: schedule.isRealtorPaid,
    createdAt: schedule.createdAt,
    updatedAt: schedule.updatedAt,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-8xl mx-auto space-y-10">
        {/* Header */}
        <GoBackBtn />
        <IntroHeading label={"Inspection Manager"} />

        {/* Status Card */}
        <div className="bg-white shadow shadow-slate-200 p-5 rounded-xl">
          <div className="p-6">
            <div className="flex smmobile:flex-col smmobile:gap-4 items-center justify-between">
              <Link
                to={
                  user?.role === "client"
                    ? `/listing/${inspectionData?.propertySlug}`
                    : `/app/manage-property/${inspectionData?.propertyID}`
                }
                className="heading-2"
              >
                {inspectionData?.propertyName}
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white shadow shadow-slate-200 p-5 rounded-xl">
          <div className="p-6">
            <div className="flex smmobile:flex-col smmobile:gap-4 items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <HiOutlineInformationCircle
                  size={24}
                  className="text-blue-500"
                />
                Inspection Status
              </h2>
              <span
                className={`px-10 py-4 smmobile:px-6 smmobile:py-3 smmobile:text-[1.2rem] text-sm rounded-xl uppercase tracking-wider font-medium ${getStatusColor(
                  inspectionData.status
                )}`}
              >
                {inspectionData.status}
              </span>
            </div>
          </div>
        </div>
        {user?.role !== "client" && (
          <div className="bg-white shadow shadow-slate-200 p-10 rounded-xl flex flex-wrap items-center bigmobile:flex-col gap-10">
            <span className="uppercase tracking-wide font-semibold text-slate-500">
              Update Inspection Status
            </span>
            <div
              className={`bg-gradient-to-tr from-slate-50 to-slate-100 h-16 rounded-full flex items-center gap-3 px-6 py-2 transition-all duration-300 ease-linear focus-within:ring-4 focus:ring-offset-2 focus-within:ring-blue-500 ring-2 justify-start`}
            >
              <FaRegCircleCheck size={24} className="text-blue-500" />
              <select
                className="bg-transparent h-full capitalize flex-1 outline-none text-slate-500"
                disabled={isUpdating}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                {inspectionData.status !== "accepted" && (
                  <option value="accepted">Accept Inspection</option>
                )}
                <option value="completed">Mark as Completed</option>
              </select>
            </div>
            {["accepted", "completed"].includes(status) && (
              <Button
                disabled={isUpdating}
                onClick={() => updateStatus({ id: schedule._id, status })}
              >
                {isUpdating ? (
                  <LoaderSm />
                ) : (
                  <>
                    <HiOutlinePaperAirplane size={24} />
                    <span>Update Status</span>
                  </>
                )}
              </Button>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 gap-10 bg-white shadow shadow-slate-200 p-5 rounded-xl smtablet:grid-cols-1">
          {/* Client Information */}
          {user?.role === "realtor" && (
            <div className="">
              <div className="p-6 border-b border-gray-200">
                <h2 className="heading-2">Client Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HiOutlineUser size={18} className="text-blue-500" />
                    <span className="font-medium capitalize">
                      {inspectionData.clientName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TfiEmail size={18} className="text-blue-500" />
                    <span className="text-gray-600">
                      {inspectionData.clientEmail}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Message:
                  </p>
                  <p className="text-gray-600 text-[1.6rem] italic">
                    &apos;{inspectionData.message}&apos;
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Realtor Information */}
          {user?.role === "client" && (
            <div className="">
              <div className="p-6 border-b border-gray-200">
                <h2 className="heading-2">Realtor Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HiOutlineUser size={18} className="text-blue-500" />
                    <Link
                      to={`/realtor-detail/${inspectionData.realtorId}`}
                      className="font-medium capitalize"
                    >
                      {inspectionData.realtorName}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <TfiEmail size={18} className="text-blue-500" />
                    <span className="text-gray-600">
                      {inspectionData.realtorEmail}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Message:
                  </p>
                  <p className="text-gray-600 text-[1.6rem] italic">
                    &apos;{inspectionData.message}&apos;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Information */}
          <div className="">
            <div className="p-6 border-b border-gray-200">
              <h2 className="heading-2">Schedule Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar size={18} className="text-blue-500" />
                  <span className="font-medium">
                    {moment(inspectionData.scheduleDate).format(
                      "dddd, MMM DD, YYYY"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <LuAlarmClock size={18} className="text-blue-500" />

                  <span className="text-gray-600">
                    {moment(inspectionData.scheduleDate).format("h:mm A")}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200 text-[1.4rem] text-gray-500">
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {moment(inspectionData.createdAt).format("LLLL")}
                </p>
                <p>
                  <span className="font-semibold">Updated:</span>{" "}
                  {moment(inspectionData.updatedAt).format("LLLL")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white shadow shadow-slate-200 p-5 rounded-xl">
          <div className="p-6 border-b border-gray-200">
            <h2 className="heading-2">Payment Details</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-10 bigmobile:grid-cols-1">
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-[1.6rem] smtablet:text-[1.4rem] text-gray-600 mb-1">
                  Inspection Fee
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  ₦{inspectionData.inspectionFee}
                </p>
              </div>
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-[1.6rem] smtablet:text-[1.4rem] text-gray-600 mb-1">
                  Platform Commission
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  ₦{inspectionData.platformCommission}
                </p>
              </div>
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-[1.6rem] smtablet:text-[1.4rem] text-gray-600 mb-1">
                  Total Paid
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  ₦{inspectionData.totalPaid}
                </p>
              </div>
            </div>
            <div className="mt-8 flex smmobile:flex-col items-center gap-8 text-slate-600">
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full ${
                    inspectionData.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span>
                  Client Payment: {inspectionData.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full ${
                    inspectionData.isRealtorPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span>
                  Realtor Payment:{" "}
                  {inspectionData.isRealtorPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex gap-4 justify-center flex-wrap">
          <Button color="from-purple-500 to-purple-700 ring-purple-300">
            <HiOutlinePaperAirplane size={24} />
            <span>Update Status</span>
          </Button>
          <Button>
            <HiOutlineCalendar size={24} className="text-white" />
            <span>Reschedule</span>
          </Button>
          <Button color="from-red-500 to-red-700 ring-red-300">
            <HiOutlineXCircle size={24} className="text-white" />
            <span>Cancel Inspection</span>
          </Button>
        </div> */}
      </div>
    </div>
  );
}
