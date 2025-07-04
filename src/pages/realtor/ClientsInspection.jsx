import { HiOutlineEye } from "react-icons/hi";
import IntroHeading from "../../components/IntroHeading";
import GoBackBtn from "../../components/GoBackBtn";
import { useState } from "react";
import { LoaderMd } from "../../static/Loaders";
import { Link } from "react-router-dom";
import { NoMessage } from "../../components/NoDataMsg";
import {
  BtnAction,
  Pagination,
  SearchAndSort,
} from "../../components/TableActions";
import moment from "moment";
import { LuMessageCircle } from "react-icons/lu";
import { SlClose } from "react-icons/sl";
import { useViewRealtorInspectionSchedules } from "../../hooks/useSchedule";

export default function ClientsInspection() {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const { isPending, schedules, isError, totalCount } =
    useViewRealtorInspectionSchedules({
      sort,
      search: activeSearch,
      page: currentPage,
    });
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(search);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalCount / 10))
      setCurrentPage(newPage);
  };

  const sortOptions = [
    { value: "clientName", label: "Client Name (A - Z)" },
    { value: "-clientName", label: "Client Name (Z - A)" },
    { value: "status", label: "Inspection Status (+)" },
    { value: "-status", label: "Inspection Status (-)" },
    { value: "createdAt", label: "Time of Inquiry (+)" },
    { value: "-createdAt", label: "Time of Inquiry (-)" },
    { value: "scheduleDate", label: "Schedule Date (A - Z)" },
    { value: "-scheduleDate", label: "Schedule Date (Z - A)" },
  ];

  const handleOpenPopup = (message) => {
    setSelectedMessage(message);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedMessage("");
  };

  return (
    <>
      {showPopup && (
        <InspectionPopup message={selectedMessage} onClose={handleClosePopup} />
      )}

      <GoBackBtn />
      <IntroHeading
        label={`Inspection Schedules (${schedules?.length || 0})`}
      />
      <SearchAndSort
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
        sort={sort}
        onSortChange={(e) => setSort(e.target.value)}
        sortOptions={sortOptions}
      />
      <br />
      {isPending ? (
        <LoaderMd />
      ) : (
        <>
          <div className="overflow-auto rounded-2xl">
            <table className="mx-auto bg-white shadow shadow-slate-200 rounded-2xl w-full text-left midtablet:w-[120rem] capitalize">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Client Name</th>
                  <th>Inspection Status</th>
                  <th>Schedule Date</th>
                  <th>Time Sent</th>
                  <th>Inspection Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {schedules &&
                  schedules.map((el, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{el.clientName}</td>
                      <td>
                        <div
                          className={`py-2 px-5 bg-gradient-to-b ${
                            el.status === "pending"
                              ? "from-yellow-100 to-yellow-200 text-yellow-700"
                              : el.status === "completed"
                              ? "from-green-100 to-green-200 text-green-700"
                              : el.status === "accepted"
                              ? "from-sky-100 to-sky-200 text-sky-700"
                              : el.status === "rescheduled"
                              ? "from-stone-100 to-stone-200 text-stone-700"
                              : "from-red-100 to-red-200 text-red-700"
                          } rounded-xl flex justify-center capitalize`}
                        >
                          {el.status}
                        </div>
                      </td>
                      <td>{moment(el.scheduleDate).format("LLL")}</td>
                      <td>{moment(el.createdAt).fromNow()}</td>
                      <td>₦{el.totalPaid.toLocaleString()}</td>
                      <td>
                        <div className="flex items-center gap-4">
                          <Link to={`/app/manage-property/${el.property._id}`}>
                            <BtnAction
                              title="View property details"
                              clr="from-slate-100 to-slate-200 text-slate-600"
                              hoverClr=" hover:from-slate-500 hover:to-slate-500 hover:text-slate-50"
                              icon={<HiOutlineEye size={20} />}
                            />
                          </Link>
                          <button onClick={() => handleOpenPopup(el.message)}>
                            <BtnAction
                              title="View message"
                              clr="from-indigo-100 to-indigo-200 text-indigo-600"
                              hoverClr="hover:from-indigo-500 hover:to-indigo-500 hover:text-indigo-50"
                              icon={<LuMessageCircle />}
                            />
                          </button>
                          {/* <BtnAction
                            clr="from-indigo-100 to-indigo-200 text-indigo-600"
                            hoverClr="hover:from-indigo-500 hover:to-indigo-500 hover:text-indigo-50"
                            icon={<CiEdit size={20} />}
                          /> */}
                          {/* <BtnAction
                      clr=" from-red-100 to-red-200 text-red-600"
                      hoverClr="hover:from-red-500 hover:to-red-500 hover:text-red-50"
                      icon={<HiOutlineTrash size={20} />}
                    /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {(isError || schedules?.length === 0) && (
            <NoMessage model="schedules" />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / 10)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}

function InspectionPopup({ message, onClose }) {
  return (
    <div className="fixed w-[calc(100vw-26rem)] h-full top-0 left-[27rem] smtablet:left-0 smtablet:w-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-[80rem] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-800"
        >
          <SlClose />
        </button>

        {/* Title */}
        <h2 className="text-5xl font-semibold text-blue-500 mb-4">
          Additional Message
        </h2>

        {/* Message Content */}
        <p className="text-gray-600 text-3xl leading-[1.7]">{message}</p>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 flex items-center gap-4 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            <SlClose />
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
