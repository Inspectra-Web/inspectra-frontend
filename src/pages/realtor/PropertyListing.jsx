import { HiOutlineEye } from "react-icons/hi";
import IntroHeading from "../../components/IntroHeading";
import { formatUnit } from "../../helpers/helpers";
import GoBackBtn from "../../components/GoBackBtn";
import { useState } from "react";
import { useMyPropertyListings } from "../../hooks/useProperty";
import { LoaderMd } from "../../static/Loaders";
import { Link } from "react-router-dom";
import { NoMessage } from "../../components/NoDataMsg";
import {
  BtnAction,
  Pagination,
  SearchAndSort,
} from "../../components/TableActions";
import { useUser } from "../../hooks/useAuth";
import { CiEdit } from "react-icons/ci";

export default function PropertyListing() {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { isError, isPending, properties, totalCount } = useMyPropertyListings({
    sort,
    search: activeSearch,
    page: currentPage,
  });
  const { user } = useUser();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(search);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalCount / 10))
      setCurrentPage(newPage);
  };

  const sortOptions = [
    { value: "title", label: "Title (A - Z)" },
    { value: "-title", label: "Title (Z - A)" },
    { value: "type", label: "Type (A - Z)" },
    { value: "-type", label: "Type (Z - A)" },
    { value: "category", label: "Category (A - Z)" },
    { value: "-category", label: "Category (Z - A)" },
    { value: "listingStatus", label: "Listing Status (A - Z)" },
    { value: "-listingStatus", label: "Listing Status (Z - A)" },
    { value: "city", label: "City (A - Z)" },
    { value: "-city", label: "City (Z - A)" },
    { value: "price", label: "Price (Low to High)" },
    { value: "-price", label: "Price (High to Low)" },
  ];

  return (
    <>
      <GoBackBtn />
      <IntroHeading label={`My Property Listings (${user?.property.length})`} />
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
                  <th className="w-96">Photo & Name</th>
                  <th>Year</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>City</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {properties &&
                  properties.map((el, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <div className="flex items-center gap-6">
                          <div className="w-24 h-24 rounded-xl ring-2 ring-offset-1 overflow-hidden">
                            <img
                              src={el.images[0].url}
                              alt={el.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="max-w-[20rem] truncate">
                            <Link
                              title={el.title}
                              to={`/app/manage-property/${el._id}`}
                              className="font-semibold text-slate-800 hover:text-blue-500 transition-all ease-linear"
                            >
                              {el.title}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>{el.features?.yearBuilt || "NIL"}</td>
                      <td>{el.type}</td>
                      <td>{el.category}</td>
                      <td>
                        <div
                          className={`py-2 px-5 bg-gradient-to-b ${
                            el.listingStatus === "rent"
                              ? "from-green-100 to-green-200 text-green-700"
                              : el.listingStatus === "lease"
                              ? "from-orange-100 to-orange-200 text-orange-700"
                              : el.listingStatus === "shortlet"
                              ? "from-purple-100 to-purple-200 text-purple-700"
                              : "from-sky-100 to-sky-200 text-sky-700"
                          } rounded-xl flex justify-center capitalize`}
                        >
                          {el.listingStatus}
                        </div>
                      </td>
                      <td>
                        {/* <div className="flex items-center gap-3">
                          <IoBedOutline size={20} />
                          <span>{el.bedroom}</span>
                        </div> */}
                        {el.address?.city}
                      </td>
                      <td>₦{formatUnit(el.price)}</td>
                      <td>
                        <div className="flex items-center gap-4">
                          <Link to={`/app/manage-property/${el._id}`}>
                            <BtnAction
                              title="View property details"
                              clr="from-slate-100 to-slate-200 text-slate-600"
                              hoverClr=" hover:from-slate-500 hover:to-slate-500 hover:text-slate-50"
                              icon={<HiOutlineEye size={20} />}
                            />
                          </Link>
                          <Link to={`/app/update-property/${el._id}`}>
                            <BtnAction
                              title="Edit property details"
                              clr="from-indigo-100 to-indigo-200 text-indigo-600"
                              hoverClr="hover:from-indigo-500 hover:to-indigo-500 hover:text-indigo-50"
                              icon={<CiEdit size={20} />}
                            />
                          </Link>

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
          {(isError || properties?.length === 0) && (
            <NoMessage model="properties" />
          )}
          {properties?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalCount / 10)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}
