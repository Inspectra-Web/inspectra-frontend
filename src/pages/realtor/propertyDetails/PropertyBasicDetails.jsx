import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { LuMousePointer2 } from "react-icons/lu";
import Button from "../../../components/Button";
import { MdOutlineMyLocation } from "react-icons/md";
import { HiOutlineWallet } from "react-icons/hi2";
import { getRentalDuration } from "../../../helpers/helpers";

export default function PropertyBasicDetails({
  title,
  verified,
  variations,
  fullAddress,
  price,
  _id,
  rentalDuration,
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-8 midtablet:flex-col midtablet:items-start midtablet:gap-5">
        <div>
          <h2 className="heading-2 text-6xl">{title}.</h2>
          {verified && (
            <div
              className={`cursor-default inline-flex items-center justify-center gap-2 border-dotted border-2 rounded-3xl px-4 text-green-500 border-green-500 mr-2 mt-5`}
            >
              <CiCircleCheck />
              <span className="text-[12px]">{verified && "Verified"}</span>
            </div>
          )}
          {variations.map((el, idx) => (
            <div
              key={idx}
              className={`cursor-default inline-flex items-center justify-center gap-2 border-dotted border-2 rounded-3xl px-4 ${
                el === "Featured"
                  ? "text-blue-500 border-blue-500"
                  : "text-slate-500 border-slate-500"
              } mr-2 mt-5`}
            >
              {el === "Featured" && <LuMousePointer2 />}
              <span className="text-[12px]">{el}</span>
            </div>
          ))}
          <div className="flex gap-4 mt-5 text-slate-600 items-center">
            <MdOutlineMyLocation size={24} className="text-blue-500" />
            <address className="not-italic">{fullAddress}</address>
          </div>
        </div>
        <Button variation="link" link={`/app/update-property/${_id}`}>
          <CiEdit size={24} />
          <span>Edit Property</span>
        </Button>
      </div>
      <div className="flex items-center gap-5 my-10">
        <HiOutlineWallet
          size={45}
          className="p-3 bg-gradient-to-br from-green-100 to-green-200 text-green-700 rounded-xl"
        />
        <span className="text-slate-600 text-5xl font-semibold">
          ₦ {price.toLocaleString()}
        </span>
        <span>{getRentalDuration(rentalDuration)}</span>
      </div>
    </>
  );
}
