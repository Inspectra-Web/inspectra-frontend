import {
  IoBedOutline,
  IoCaretBackOutline,
  IoCaretForward,
} from "react-icons/io5";
import PropertyFeaturesBox from "../../../components/PropertyFeaturesBox";
import { PiBathtub, PiCookingPotLight } from "react-icons/pi";
import { useGetFeaturedListings } from "../../../hooks/useProperty";
import { LoaderLg } from "../../../static/Loaders";
import moment from "moment";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LuMousePointer2 } from "react-icons/lu";

export default function Hero() {
  const { isPending, isError, data } = useGetFeaturedListings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  if (isPending) return <LoaderLg />;
  if (isError)
    return (
      <p className="text-center heading-2 mt-20 px-10">
        Unable to Load Featured Listings. Check network connection.
      </p>
    );
  if (!data || data.length === 0) return null;

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));

  return (
    <>
      <section className="h-[65rem] smtablet:h-[70vh] midmobile:h-[58vh]">
        <div ref={carouselRef} className="h-full relative">
          {data &&
            data.map((_, index) => {
              const currentProperty = data[currentIndex];
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="px-10 py-5 smmobile:px-5 smmobile:gap-3 bg-blue-500 text-white rounded-full ring-2 ring-offset-2 absolute flex items-center gap-5 -translate-x-2/4 left-2/4 top-10 cursor-default">
                    <LuMousePointer2 className="text-[2.8rem] smmobile:text-[2rem]" />
                    <span>
                      {currentProperty.variations.includes("Featured") &&
                        "Featured Listings"}
                    </span>
                  </div>
                  <Link to={`/listing/${currentProperty.slug}`}>
                    <img
                      title={currentProperty.title}
                      src={currentProperty.images[0].url}
                      alt={currentProperty.title}
                      className={`w-full h-full object-cover transition-all`}
                    />
                  </Link>
                  <div className="w-[80%] mindesktop:w-[96%] flex justify-between smtablet:grid smtablet:grid-cols-2 smtablet:w-[70rem] gap-16 p-14 bg-white rounded-[3rem] absolute bottom-0 left-1/2 -translate-x-2/4 translate-y-2/4 border-2 midmobile:w-full midmobile:gap-12 smmobile:grid-cols-1 midmobile:rounded-none midmobile:-bottom-48">
                    <div className="flex flex-col gap-5 smtablet:col-span-2 smmobile:col-span-1">
                      <div className="flex items-baseline gap-3 w-[35rem] smmobile:w-full">
                        <h2
                          title={currentProperty.title}
                          className="heading-2 truncate"
                        >
                          {currentProperty.title}
                        </h2>
                        <p className="font-medium italic">
                          {currentProperty.features.yearBuilt}
                        </p>
                      </div>
                      <p className="font-semibold text-2xl">
                        Added:{" "}
                        <span className="font-normal">
                          {moment(currentProperty.createdAt).format("ll")}
                        </span>
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-14">
                      {currentProperty.features.bedrooms > 0 && (
                        <PropertyFeaturesBox
                          hover={false}
                          featureText="Bedrooms"
                          numberText={currentProperty.features.bedrooms}
                          icon={
                            <IoBedOutline className="text-blue-500" size={28} />
                          }
                        />
                      )}
                      {currentProperty.features.bathrooms > 0 && (
                        <PropertyFeaturesBox
                          hover={false}
                          featureText="Bathrooms"
                          numberText={currentProperty.features.bathrooms}
                          icon={
                            <PiBathtub className="text-blue-500" size={28} />
                          }
                        />
                      )}
                      {currentProperty.features.kitchen > 0 && (
                        <PropertyFeaturesBox
                          hover={false}
                          featureText="Kitchen"
                          numberText={currentProperty.features.kitchen}
                          icon={
                            <PiCookingPotLight
                              className="text-blue-500"
                              size={28}
                            />
                          }
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-6">
                      <p className="text-blue-500 font-medium capitalize">
                        for {currentProperty.listingStatus}
                      </p>
                      <span className="text-slate-900 text-5xl font-semibold">
                        ₦{currentProperty.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {currentIndex !== 0 && (
                    <button
                      onClick={handlePrev}
                      className="hover:bg-blue-500 transition-all ease-linear w-16 h-16 flex justify-center items-center rounded-full text-white bg-slate-800 absolute top-1/2 left-10 z-[1000]"
                    >
                      <IoCaretBackOutline />
                    </button>
                  )}
                  {currentIndex !== data.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="hover:bg-blue-500 transition-all ease-linear w-16 h-16 flex justify-center items-center rounded-full text-white bg-slate-800 absolute top-1/2 right-10 z-[1000]"
                    >
                      <IoCaretForward />
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
}
