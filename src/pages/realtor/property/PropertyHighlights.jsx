import { FormFieldHolder } from "../FormFieldHolder";
import { FormInput } from "../FormInput";

export default function PropertyHighlights({ register, errors }) {
  return (
    <>
      <h2 className="mt-20 mb-5 heading-2">
        Highlights & Notable Point (OPTIONAL)
      </h2>
      <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-1">
        <FormFieldHolder label="Urgency Tag">
          <select
            id="urgency-tag"
            {...register("urgencyTag")}
            className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-800"
          >
            <option value="NONE">No Tag</option>

            {/* Scarcity / FOMO */}
            <option value="1 unit left📌">1 UNIT LEFT📌</option>
            <option value="few units remaining">FEW UNITS REMAINING</option>
            <option value="last chance – limited offer">
              LAST CHANCE – LIMITED OFFER
            </option>
            <option value="almost sold out">ALMOST SOLD OUT</option>

            {/* Time-Limited Offers */}
            <option value="limited time offer⏳">LIMITED TIME OFFER⏳</option>
            <option value="discount valid this week only">
              DISCOUNT VALID THIS WEEK ONLY
            </option>
            <option value="offer ends soon">OFFER ENDS SOON</option>
            <option value="move-in before month end">
              MOVE-IN BEFORE MONTH END
            </option>

            {/* Exclusivity / Prestige */}
            <option value="exclusive listing">EXCLUSIVE LISTING</option>
            <option value="private viewing only">PRIVATE VIEWING ONLY</option>
            <option value="luxury – rare find">LUXURY – RARE FIND</option>
            <option value="premium deal">PREMIUM DEAL</option>

            {/* Urgency in Deals */}
            <option value="price reduced🔥">PRICE REDUCED🔥</option>
            <option value="hot deal – act fast">HOT DEAL – ACT FAST</option>
            <option value="flash sale – today only">
              FLASH SALE – TODAY ONLY
            </option>
            <option value="best deal in area">BEST DEAL IN AREA</option>

            {/* New / Fresh Listings */}
            <option value="just listed✨">JUST LISTED✨</option>
            <option value="brand new apartment">BRAND NEW APARTMENT</option>
            <option value="newly built home">NEWLY BUILT HOME</option>
            <option value="fresh on market">FRESH ON MARKET</option>
          </select>
        </FormFieldHolder>
        <FormFieldHolder label="Negotiable Status">
          <select
            id="negotiable-status"
            {...register("negotiableStatus")}
            className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-800"
          >
            <option value="Asking">Is Price Negotiable?</option>
            <option value="Negotiable">Negotiable</option>
            <option value="Slightly Negotiable">Slightly Negotiable</option>
            <option value="Asking">Asking</option>
          </select>
        </FormFieldHolder>
        <FormFieldHolder
          label="Special Offer"
          error={errors?.specialOffer?.message}
        >
          <FormInput
            id="special-offer"
            {...register("specialOffer", {
              maxLength: { value: 200, message: "Max 200 characters" },
            })}
            placeholder="e.g. 50% off first month rent"
          />
        </FormFieldHolder>

        <div className="col-span-3 midmobile:col-span-1">
          <FormFieldHolder
            label="Notable Point"
            error={errors?.notablePoint?.message}
          >
            <FormInput
              id="notable-point"
              {...register("notablePoint")}
              placeholder="e.g., Fully furnished and serviced"
            />
          </FormFieldHolder>
        </div>
      </div>
    </>
  );
}
