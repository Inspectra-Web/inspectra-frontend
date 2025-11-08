import { BsInfoCircle } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import {
  HiOutlineArrowPath,
  HiOutlineCircleStack,
  HiOutlineDocumentText,
  HiOutlineLightBulb,
  HiOutlineListBullet,
  HiOutlineUsers,
} from "react-icons/hi2";
const transparentFeesAndTerms = {
  basePrice: 1500000,
  currency: "NGN",
  paymentTerms: "Two installments allowed",
  negotiability: {
    listingStatus: true,
    agencyFee: false,
    legalFee: true,
  },
  additionalFees: [
    {
      name: "Agency Fee",
      description: "Realtor's service charge for securing the property",
      amount: 150000,
      optional: false,
    },
    {
      name: "Legal Fee",
      description: "Drafting of tenancy agreement",
      amount: 50000,
      optional: false,
    },
    {
      name: "Caution Deposit",
      description: "Refundable at the end of tenancy",
      amount: 100000,
      optional: false,
    },
  ],
  refundPolicy:
    "Inspection fees are non-refundable. Caution deposit refundable after tenancy if no damage.",
  duration: "1 year minimum",
  utilitiesIncluded:
    "Waste disposal and water included; electricity billed separately.",
  specialNotes: "Pets not allowed. All payments through Inspectra.",
};

function formatCurrency(amount, currency) {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  });
  return formatter.format(amount).replace("₦", "₦").trim();
}

export default function TransparentFeesAndTerms() {
  return (
    <>
      <h3 className="heading-2 text-5xl mt-20 mb-5">Fees & Terms</h3>

      {/* Base Price Section */}
      <div className="pb-10 mb-10 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <HiOutlineCircleStack className="text-blue-600 text-[3.8rem]" />
          <h2 className="text-[2rem] font-semibold text-slate-800">
            Base Price
          </h2>
        </div>
        <p className="text-[2.4rem] font-bold text-blue-500 ml-8">
          {formatCurrency(
            transparentFeesAndTerms.basePrice,
            transparentFeesAndTerms.currency
          )}
        </p>
      </div>

      {/* Payment Terms Section */}
      <div className="pb-10 mb-10 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <HiOutlineDocumentText className="text-blue-600 text-[3.8rem]" />
          <h2 className="text-[2rem] font-semibold text-slate-800">
            Payment Terms
          </h2>
        </div>
        <p className="text-slate-700 text-[1.8rem] ml-8">
          {transparentFeesAndTerms.paymentTerms}
        </p>
      </div>

      {/* Negotiability Section */}
      <div className="pb-10 mb-10 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <HiOutlineUsers className="text-blue-600 text-[3.8rem]" />
          <h2 className="text-[2rem] font-semibold text-slate-800">
            Negotiability
          </h2>
        </div>
        <div className="ml-8 space-y-2">
          {Object.entries(transparentFeesAndTerms.negotiability).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-slate-700 capitalize text-[1.8rem]">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span
                  className={`px-6 py-2 mt-2 rounded-full font-medium ${
                    value
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {value ? "Negotiable" : "Fixed"}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Additional Fees Section */}
      <div className="pb-10 mb-10 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <HiOutlineListBullet className="text-blue-600 text-[3.8rem]" />
          <h2 className="text-[2rem] font-semibold text-slate-800">
            Additional Fees
          </h2>
        </div>
        <div className="ml-8 space-y-8">
          {transparentFeesAndTerms.additionalFees.map((fee, index) => (
            <div key={index} className="p-6 bg-slate-50 rounded-lg">
              <div className="flex-1 flex items-center justify-between">
                <p className="font-semibold text-[1.8rem] text-slate-800">
                  {fee.name}
                </p>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="font-semibold text-slate-800 whitespace-nowrap text-[1.8rem]">
                    {formatCurrency(
                      fee.amount,
                      transparentFeesAndTerms.currency
                    )}
                  </p>
                  <span
                    className={`px-4 py-2 rounded text-[1.4rem] sm:hidden font-medium whitespace-nowrap ${
                      fee.optional
                        ? "bg-slate-200 text-slate-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {fee.optional ? "Optional" : "Required"}
                  </span>
                </div>
              </div>
              <p className=" text-slate-500">{fee.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Refund Policy Section */}
      <div className="pb-10 mb-10 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <HiOutlineArrowPath className="text-blue-600 text-[3.8rem]" />
          <h2 className="text-[2rem] font-semibold text-slate-800">
            Refund Policy
          </h2>
        </div>
        <p className="text-slate-700 ml-8 text-[1.8rem]">
          {transparentFeesAndTerms.refundPolicy}
        </p>
      </div>

      {/* Duration Section */}
      <div className="pb-10 mb-10 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <GoClock className="text-blue-600 text-[3.8rem]" />
          <h2 className="text-[2rem] font-semibold text-slate-800">Duration</h2>
        </div>
        <p className="text-slate-700 ml-8 text-[1.8rem]">
          {transparentFeesAndTerms.duration}
        </p>
      </div>

      {/* Utilities Section */}
      <div className="pb-10 mb-10 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <HiOutlineLightBulb className="text-blue-600 text-[3.8rem]" />
          <h2 className="text-[2rem] font-semibold text-slate-800">
            Utilities
          </h2>
        </div>
        <p className="text-slate-700 ml-8 text-[1.8rem]">
          {transparentFeesAndTerms.utilitiesIncluded}
        </p>
      </div>

      {/* Special Notes Section */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <BsInfoCircle className="text-blue-600 text-[3.8rem]" />
          <h2 className="text-[2rem] font-semibold text-slate-800">
            Special Notes
          </h2>
        </div>
        <p className="text-slate-700 ml-8 text-[1.8rem]">
          {transparentFeesAndTerms.specialNotes}
        </p>
      </div>
    </>
  );
}
