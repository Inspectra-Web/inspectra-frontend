import { useCallback, useRef, useState } from "react";
import { CardContainer } from "../../components/CardContainer";
import ListingsSearch from "../../components/ListingsSearch";
import { useGetPropertyListingsInfinite } from "../../hooks/useProperty";
import { LoaderMd } from "../../static/Loaders";
import { NoMessage } from "../../components/NoDataMsg";
import Button from "../../components/Button";
import { CiSearch } from "react-icons/ci";

export default function ListingsPage() {
  const [showListingSearch, setShowListingSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const defaultFilters = {
    type: "",
    listStatus: "",
    category: "",
    location: "",
  };

  const [filters, setFilters] = useState(defaultFilters);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useGetPropertyListingsInfinite({
    sort: "-createdAt",
    filters,
    search: activeSearch,
  });

  const observer = useRef();

  const lastPropertyRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setActiveSearch(search);
    refetch(); // Refetch properties when filters change
  };

  const handleDefaultFilter = () => {
    setFilters(defaultFilters);
    refetch();
  };

  const noResults =
    !isPending &&
    (!data?.pages || data.pages.every((page) => page.properties.length === 0));

  return (
    <div className="px-10 smmobile:px-3 pb-20 min-h-[50rem]">
      {/* <div className="bg-yellow-50 rounded-2xl my-5 border-t border-yellow-200 text-yellow-800 text-3xl p-2 text-center">
        Note: All properties currently listed on Inspectra are demo listings as
        part of our MVP launch. Real listings will be available soon!
      </div> */}
      {!showListingSearch && (
        <div
          className={`transition-all duration-500 ease-in-out ${
            showListingSearch
              ? "opacity-0 scale-95 pointer-events-none absolute"
              : "opacity-100 scale-100 relative"
          } flex justify-center`}
        >
          <button
            className="flex focus:ring-4 ring-offset-2 items-center gap-3 px-16 py-10 rounded-full text-white bg-gradient-to-tr bg-[length:200%] bg-left hover:bg-right transition-all duration-500 ease justify-center cursor-pointer from-blue-500 to-blue-700 ring-blue-300"
            onClick={() => setShowListingSearch(!showListingSearch)}
          >
            <span>Search</span> <CiSearch size={24} />
          </button>
        </div>
      )}
      <div
        className={`transition-all duration-500 ease-in-out ${
          showListingSearch
            ? "opacity-100 scale-100 relative"
            : "opacity-0 scale-95 pointer-events-none absolute"
        } flex justify-center mt-10`}
      >
        {showListingSearch && (
          <ListingsSearch
            onCloseSearch={setShowListingSearch}
            onSearch={handleSearch}
            searchInput={
              <input
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search By Title, Property ID, Address"
                className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-700 w-[300px] placeholder:text-slate-500 smmobile:w-full"
              />
            }
          />
        )}
      </div>

      {isPending && <LoaderMd />}
      <div className="grid grid-cols-3 gap-16 mt-20 midtablet:grid-cols-2 bigmobile:grid-cols-1">
        {noResults && (
          <div className="col-span-3 flex flex-col items-center">
            <NoMessage model="Listings" />
            <Button
              onClick={() => {
                handleDefaultFilter();
                window.location.reload();
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}

        {data &&
          data?.pages.map((group, index) => {
            return group.properties.map((property, propertyIndex) => {
              if (
                index === data.pages.length - 1 &&
                propertyIndex === group.properties.length - 1
              ) {
                return (
                  <>
                    {property && (
                      <CardContainer
                        ref={lastPropertyRef}
                        key={property._id}
                        property={property}
                      />
                    )}
                  </>
                );
              }

              return (
                <>
                  {property && (
                    <CardContainer key={property._id} property={property} />
                  )}
                </>
              );
            });
          })}
      </div>
      {isFetchingNextPage && (
        <p className="text-center mt-10 text-gray-500">
          Loading more properties...
        </p>
      )}
    </div>
  );
}
