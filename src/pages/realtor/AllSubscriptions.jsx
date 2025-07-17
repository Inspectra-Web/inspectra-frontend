import { useState } from "react";
import { useGetAllSubscriptions } from "../../hooks/useSubscription";
import { Pagination, SearchAndSort } from "../../components/TableActions";
import { NoMessage } from "../../components/NoDataMsg";
import moment from "moment";
import { LoaderMd } from "../../static/Loaders";
import IntroHeading from "../../components/IntroHeading";
import GoBackBtn from "../../components/GoBackBtn";

export default function AllSubscriptions() {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, subscriptions, isError, totalCount } =
    useGetAllSubscriptions({
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
    { value: "planName", label: "Plan Name (A - Z)" },
    { value: "-planName", label: "Plan Name (Z - A)" },
    { value: "amount", label: "Amount (Low to High)" },
    { value: "-amount", label: "Amount (High to Low)" },
    { value: "subscriptionStartDate", label: "Start Date (Oldest First)" },
    { value: "-subscriptionStartDate", label: "Start Date (Newest First)" },
    { value: "subscriptionEndDate", label: "End Date (Oldest First)" },
    { value: "-subscriptionEndDate", label: "End Date (Newest First)" },
    { value: "subscriptionStatus", label: "Status (A - Z)" },
    { value: "-subscriptionStatus", label: "Status (Z - A)" },
  ];

  return (
    <>
      <GoBackBtn />
      <IntroHeading
        label={`All Subscriptions (${subscriptions?.length || 0})`}
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
                  <th>Plan</th>
                  <th>Amount (₦)</th>
                  <th>subscriber</th>
                  <th>Interval</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Payment</th>
                  <th>Tx Ref</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions &&
                  subscriptions.map((sub, idx) => (
                    <tr key={sub._id}>
                      <td>{idx + 1}</td>
                      <td>{sub.planName}</td>
                      <td>{sub.amount.toLocaleString()}</td>
                      <td className="lowercase">{sub.userEmail}</td>
                      <td>{sub.interval}</td>
                      <td>
                        <div
                          className={`py-2 px-4 rounded-xl font-medium text-center ${
                            sub.subscriptionStatus === "active"
                              ? "bg-green-100 text-green-700"
                              : sub.subscriptionStatus === "cancelled"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {sub.subscriptionStatus}
                        </div>
                      </td>
                      <td>{moment(sub.subscriptionStartDate).format("ll")}</td>
                      <td>{moment(sub.subscriptionEndDate).format("ll")}</td>
                      <td className="uppercase">{sub.paymentType}</td>
                      <td>{sub.txRef || "NIL"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {(isError || subscriptions?.length === 0) && (
            <NoMessage model="subscription history" />
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
