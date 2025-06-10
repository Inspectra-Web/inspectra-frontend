import { useCallback, useRef, useState } from "react";
import { CardContainer } from "../../components/CardContainer";
import ListingsSearch from "../../components/ListingsSearch";
import { useGetPropertyListingsInfinite } from "../../hooks/useProperty";
import { LoaderMd } from "../../static/Loaders";
import { NoMessage } from "../../components/NoDataMsg";
import Button from "../../components/Button";

export default function ListingsPage() {
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
    <div className="px-10 pb-20 min-h-[50rem]">
      <ListingsSearch
        onSearch={handleSearch}
        searchInput={
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By Title, Property ID, Address"
            className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-700 w-[300px] placeholder:text-slate-500"
          />
        }
      />

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
