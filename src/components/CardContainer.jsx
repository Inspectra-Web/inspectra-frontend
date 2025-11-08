import { HiOutlineCamera, HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlineMyLocation } from "react-icons/md";
import { Link } from "react-router-dom";
import { MinFeaturesBox } from "./PropertyFeaturesBox";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub, PiCookingPotLight, PiToilet } from "react-icons/pi";
import {
  formatAmount,
  getRentalDuration,
  getTagColor,
} from "../helpers/helpers";
import { GiHomeGarage } from "react-icons/gi";
import moment from "moment";
import { forwardRef } from "react";

export function Tags({ label, css }) {
  return (
    <div
      className={`${css} capitalize transition-all ease-linear py-1 px-5 text-center rounded-full`}
    >
      {label}
    </div>
  );
}

export const CardContainer = forwardRef(({ property, landscape }, ref) => {
  return (
    <>
      {property && (
        <Link
          to={`/listing/${property?.slug}`}
          ref={ref}
          className={
            landscape ? "w-full grid grid-cols-3 gap-7 smmobile:gap-4" : ""
          }
        >
          <div
            className={`rounded-2xl relative overflow-hidden ${
              landscape
                ? "col-span-1 h-[20rem] midmobile:h-[17rem] sm:h-[12rem]"
                : ""
            }`}
          >
            <img
              src={property?.images?.[0].url}
              alt="Image"
              className={`${
                landscape ? "h-full" : "h-[30rem]"
              } w-full object-cover`}
            />
            <div
              className={`${
                landscape ? "flex-col" : ""
              } text-[1.4rem] flex  gap-3 absolute top-5 left-5`}
            >
              <Tags
                label={`for ${property?.listingStatus}`}
                css="text-slate-900 bg-white hover:bg-slate-900 hover:text-white"
              />
              {property?.urgencyTag && property?.urgencyTag !== "none" && (
                <div
                  className={`py-2 capitalize px-5 text-white ${getTagColor(
                    property?.urgencyTag
                  )} rounded-xl flex justify-center`}
                >
                  {property?.urgencyTag.toLowerCase()}
                </div>
              )}
              {property?.urgencyTag
                ? null
                : property?.variations?.map((el, idx) => (
                    <span key={idx}>
                      {el === "Featured" ? (
                        <Tags label={el} css="text-white bg-sky-500" />
                      ) : el === "Hot" ? (
                        <Tags label="Hot" css="text-white bg-red-500" />
                      ) : null}
                    </span>
                  ))}
            </div>

            <div
              className={`${
                landscape ? "bottom-5 left-5 smmobile:hidden" : "top-5 right-5"
              } absolute flex items-center gap-3`}
            >
              <div className="py-1 px-5 bg-white flex items-center gap-2 rounded-full text-sky-500">
                <HiOutlineCamera />
                <span className="text-[14px]">{property.images?.length}</span>
              </div>
              <div className="py-1 px-5 bg-white flex items-center gap-2 rounded-full text-sky-500">
                <HiOutlineVideoCamera />
                <span className="text-[14px]">
                  {property?.videoFile || property?.videos ? 1 : 0}
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              landscape
                ? "col-span-2 flex flex-col gap-4 midmobile:gap-2"
                : "w-full py-7 flex flex-col gap-4 font-medium text-slate-900"
            }
          >
            <div className="w-full truncate">
              <span className="font-semibold text-slate-900 text-[2.2rem] hover:text-blue-500 transition-all ease-linear">
                {property?.title}
              </span>
            </div>
            <div className="flex gap-2 text-slate-600">
              <MdOutlineMyLocation size={18} className="text-blue-500" />
              <div className="basis-11/12">
                <address className="not-italic text-[14px]">
                  {property?.address?.fullAddress}
                </address>
              </div>
            </div>
            <p className="text-[1.75rem] text-blue-500 capitalize">
              {property?.type} / {property?.category}
            </p>
            <div className="flex flex-wrap gap-5 justify-between">
              <p className="text-[1.8rem] text-black">
                {formatAmount(property?.price)}{" "}
                <span className="text-slate-500">
                  {" "}
                  {getRentalDuration(property?.rentalDuration)}
                </span>
              </p>
              <div className="flex items-center gap-5 sm:hidden">
                {property?.features?.bedrooms > 0 && (
                  <MinFeaturesBox
                    icon={<IoBedOutline size={24} className="text-blue-500" />}
                    label={property?.features?.bedrooms}
                  />
                )}
                {property?.features?.bathrooms > 0 && (
                  <MinFeaturesBox
                    icon={<PiBathtub size={24} className="text-blue-500" />}
                    label={property?.features?.bathrooms}
                  />
                )}
                {property?.features?.kitchen > 0 && (
                  <MinFeaturesBox
                    icon={
                      <PiCookingPotLight size={24} className="text-blue-500" />
                    }
                    label={property?.features?.kitchen}
                  />
                )}
                {property?.features?.garage > 0 && (
                  <MinFeaturesBox
                    icon={<GiHomeGarage size={24} className="text-blue-500" />}
                    label={property?.features?.garage}
                  />
                )}
                {property?.features?.toilets > 0 && (
                  <MinFeaturesBox
                    icon={<PiToilet size={24} className="text-blue-500" />}
                    label={property?.features?.toilets}
                  />
                )}
              </div>
            </div>
            <p
              className={`${
                landscape ? "midmobile:hidden" : ""
              } text-[14px] mt-5`}
            >
              Added:{" "}
              <span className="text-slate-500">
                {moment(property?.createdAt).fromNow()}
              </span>
            </p>
          </div>
        </Link>
      )}
    </>
  );
});

CardContainer.displayName = "CardContainer";
