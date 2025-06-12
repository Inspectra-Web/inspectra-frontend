import { useState } from "react";
import IntroHeading from "../../components/IntroHeading";
// import { realtors } from "../../data/realtors";
import { useAllRealtors } from "../../hooks/useRealtor";
import { LoaderMd } from "../../static/Loaders";
import { HiOutlineEye, HiFingerPrint } from "react-icons/hi";
import { TbFingerprintOff } from "react-icons/tb";
import {
  defaultAvatar,
  formatNigerianPhoneNumber,
} from "../../helpers/helpers";
import { Link } from "react-router-dom";
import { NoMessage } from "../../components/NoDataMsg";
import {
  Pagination,
  SearchAndSort,
  BtnAction,
} from "../../components/TableActions";

export default function RealtorsListing() {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, isError, realtors, totalCount } = useAllRealtors({
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
    { value: "firstname", label: "Firstname (A - Z)" },
    { value: "-firstname", label: "Firstname (Z - A)" },
    { value: "-createdAt", label: "Newest" },
    { value: "createdAt", label: "Oldest" },
    { value: "-verified", label: "Verified" },
    { value: "verified", label: "Not Verified" },
    { value: "lastname", label: "Lastname (A - Z)" },
    { value: "-lastname", label: "Lastname (Z - A)" },
    { value: "middlename", label: "middlename (A - Z)" },
    { value: "-middlename", label: "middlename (Z - A)" },
    { value: "-deactivated", label: "deactivated" },
  ];

  return (
    <>
      <IntroHeading label={`Realtors (${totalCount || 0})`} />
      <SearchAndSort
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
        sort={sort}
        onSortChange={(e) => setSort(e.target.value)}
        sortOptions={sortOptions}
      />
      <p className="text-slate-500 mt-2">
        Search based on: firstname, middlename, lastname, specialization, city,
        telephone, state, email.
      </p>
      {isPending ? (
        <>
          <br />
          <LoaderMd />
        </>
      ) : (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / 10)}
            onPageChange={handlePageChange}
          />
          <div className="overflow-auto rounded-2xl">
            <table className="mx-auto bg-white shadow shadow-slate-200 rounded-2xl w-full text-left mt-10 midtablet:w-[120rem]">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Photo & Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Experience</th>
                  <th>Verified</th>
                  <th>Specialty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {realtors &&
                  realtors.map((el, index) => (
                    <tr key={el._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-6 cursor-pointer">
                          <div className="relative">
                            <img
                              src={el.avatar || defaultAvatar(el.gender)}
                              alt={`${el.firstname} photo`}
                              className="w-24 h-24 object-cover rounded-xl ring-2 ring-offset-1"
                            />
                            {/* {el.isActive && (
                            <span className="absolute -bottom-3 -right-3 flex h-5 w-5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
                            </span>
                          )} */}
                          </div>
                          <Link
                            to={`/app/profile/${el._id}`}
                            className="font-semibold hover:text-blue-500 transition-all ease-linear text-slate-800 capitalize"
                          >
                            {el.firstname} {el.middlename}
                          </Link>
                        </div>
                      </td>
                      <td className="capitalize">{el.gender || "NIL"}</td>
                      <td className="capitalize">
                        {formatNigerianPhoneNumber(el.telephone) || "NIL"}
                      </td>
                      <td className="capitalize">{el.experience || "NIL"}</td>
                      <td className="capitalize">
                        <div className="flex justify-center">
                          {el.deactivated && <p className="text-4xl">☠️</p>}
                          {el.verified ? (
                            <HiFingerPrint className="text-blue-500 text-4xl" />
                          ) : (
                            <TbFingerprintOff className="text-stone-500 text-4xl" />
                          )}
                        </div>
                      </td>
                      <td className="capitalize">{el.specialization}</td>
                      <td>
                        <Link
                          to={`/app/profile/${el._id}`}
                          className="flex items-center gap-4"
                        >
                          <BtnAction
                            clr="from-slate-100 to-slate-200 text-slate-600"
                            hoverClr=" hover:from-slate-500 hover:to-slate-500 hover:text-slate-50"
                            icon={<HiOutlineEye size={20} />}
                          />
                          {/* <BtnAction
                    clr="from-indigo-100 to-indigo-200 text-indigo-600"
                    hoverClr="hover:from-indigo-500 hover:to-indigo-500 hover:text-indigo-50"
                    icon={<CiEdit size={20} />}
                  />
                  <BtnAction
                    clr=" from-red-100 to-red-200 text-red-600"
                    hoverClr="hover:from-red-500 hover:to-red-500 hover:text-red-50"
                    icon={<HiOutlineTrash size={20} />}
                  /> */}
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {(isError || realtors?.length === 0) && (
            <NoMessage model="realtors" />
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
