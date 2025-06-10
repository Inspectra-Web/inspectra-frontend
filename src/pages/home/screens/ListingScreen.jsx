import { HiOutlinePaperAirplane } from "react-icons/hi";
import Button from "../../../components/Button";
import { CardContainer } from "../../../components/CardContainer";
import { useGetLastestPropertyListings } from "../../../hooks/useProperty";
import { LoaderMd } from "../../../static/Loaders";

export default function Listings() {
  const { isPending, properties, isError } = useGetLastestPropertyListings();

  return (
    <section className="bg-white pt-60 pb-32 smtablet:pt-80 midmobile:pt-[30rem] smmobile:pt-[33rem]">
      <div className="w-[133rem] mindesktop:w-[95%] mx-auto">
        <div className="">
          <h2 className="heading-2 text-7xl mb-2">
            Discover Latest Properties.
          </h2>
          <p>Newest property listings around you.</p>
        </div>
        {isPending ? (
          <LoaderMd />
        ) : (
          <div className="grid grid-cols-3 gap-16 mt-20 midtablet:grid-cols-2 bigmobile:grid-cols-1">
            {properties &&
              properties?.map((property) => (
                <CardContainer key={property?._id} property={property} />
              ))}
          </div>
        )}
        {isError && <p className="text-center">Unable to fetch listings</p>}
        {!isPending && (
          <div className="mt-16 flex justify-center">
            <Button variation="link" link="/listings">
              <span>View more listings</span>
              <HiOutlinePaperAirplane size={24} className="rotate-90" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
