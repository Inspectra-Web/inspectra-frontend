import { FormFieldHolder } from "../FormFieldHolder";
import { FormInput } from "../FormInput";

export default function PropertyDetails({
  errors,
  register,
  isPending,
  watch,
  property,
  listingStatus,
  user,
}) {
  return (
    <>
      <h2 className="mt-20 mb-5 heading-2">Property Details</h2>
      <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-1">
        <FormFieldHolder label="Property Title" error={errors?.title?.message}>
          <FormInput
            disabled={isPending}
            {...register("title", { required: "Property title?" })}
            id="property-title"
            placeholder="Enter property name"
          />
        </FormFieldHolder>

        <FormFieldHolder label="Property Type" error={errors?.type?.message}>
          <select
            disabled={isPending}
            {...register("type", { required: "Property type?" })}
            id="property-type"
            className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-800"
          >
            <option value="" className="text-slate-500">
              Choose property type
            </option>
            <option value="office">Office</option>
            <option value="flat">Flat</option>
            <option value="warehouse">Warehouse</option>
            <option value="mansion">Mansion</option>
            <option value="land">Land and Plots</option>
            <option value="apartment">Apartment</option>
            <option value="maisonette">Maisonette</option>
            <option value="condominium">Condominium</option>
            <option value="duplex">Duplex</option>
            <option value="townhouse">Townhouse</option>
            <option value="villa">Villa</option>
            <option value="bungalow">Bungalow</option>
            <option value="self-contained">Self-Contained</option>
            <option value="single-family-home">Single-Family Home</option>
            <option value="multi-family-home">Multi-Family Home</option>
            <option value="studio">Studio Apartment</option>
            <option value="penthouse">Penthouse</option>
            <option value="hotel">Hotel</option>
            <option value="resort">Resort</option>
            <option value="restaurant">Restaurant</option>
            <option value="serviced-apartment">Serviced-apartment</option>
            <option value="hospital">Hospital</option>
            <option value="school">School</option>
            <option value="farm">Farm</option>
            <option value="campground">Campground</option>
            <option value="other">Other</option>
          </select>
        </FormFieldHolder>

        <FormFieldHolder
          label="Property Category"
          error={errors?.category?.message}
        >
          <select
            disabled={isPending}
            {...register("category", {
              required: "Property category?",
            })}
            id="property-category"
            className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10"
          >
            <option value="">Choose property category</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
            <option value="industrial">Industrial</option>
            <option value="land">Land</option>
            <option value="agricultural">Agricultural</option>
            <option value="hospitality">Hospitality</option>
            <option value="mixed-use">Mixed-use</option>
            <option value="institutional">Institutional</option>
            <option value="recreational">Recreational</option>
            <option value="other">Other</option>
          </select>
        </FormFieldHolder>

        <div className="col-span-3 midmobile:col-span-1">
          <FormFieldHolder
            label="Property Description"
            error={errors?.description?.message}
          >
            <textarea
              disabled={isPending}
              id="description"
              {...register("description", {
                required: "Description of property?",
              })}
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-3xl h-40 px-10 py-5 placeholder:text-slate-500 text-slate-800 resize-none"
              placeholder="Provide detailed description of the property"
            ></textarea>
          </FormFieldHolder>
        </div>
        <FormFieldHolder
          label={
            <span>
              Price{" "}
              <span className="text-emerald-400">
                ₦{Number(watch("price") || 0).toLocaleString()}
              </span>
            </span>
          }
          error={errors?.price?.message}
        >
          <FormInput
            disabled={isPending}
            {...register("price", {
              required: "Price of property?",
            })}
            id="price"
            type="number"
            placeholder="Enter price in ₦000"
          />
        </FormFieldHolder>

        <div className="col-span-2 midmobile:col-span-1">
          <FormFieldHolder
            label="Landmark"
            error={errors?.fullAddress?.message}
          >
            <FormInput
              disabled={isPending}
              {...register("fullAddress", {
                required: "Full address is?",
              })}
              id="full-address"
              placeholder="E.g: Off Takwabay Crescent, Apapa, Lagos"
              defaultValue={property?.address?.fullAddress}
            />
          </FormFieldHolder>
        </div>

        <FormFieldHolder label="City / LGA" error={errors?.city?.message}>
          <FormInput
            disabled={isPending}
            {...register("city", {
              required: "City or LGA?",
            })}
            id="city"
            placeholder="Enter city name"
            defaultValue={property?.address?.city}
          />
        </FormFieldHolder>

        <FormFieldHolder
          label="State / Province"
          error={errors?.state?.message}
        >
          <FormInput
            id="state"
            disabled={isPending}
            {...register("state", {
              required: "State or Province?",
            })}
            placeholder="Enter state name"
            defaultValue={property?.address?.state}
          />
        </FormFieldHolder>

        <FormFieldHolder label="Country" error={errors?.country?.message}>
          <FormInput
            disabled={isPending}
            {...register("country", {
              required: "Country?",
            })}
            id="country"
            placeholder="Enter country name"
            defaultValue={property?.address?.country}
          />
        </FormFieldHolder>

        <FormFieldHolder
          label="Property Status"
          error={errors?.listingStatus?.message}
        >
          <select
            disabled={isPending}
            {...register("listingStatus", {
              required: "Shortlet, Rent, Sale or Lease?",
            })}
            id="property-status"
            className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
          >
            <option value="">Choose property status</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="lease">Lease</option>
            <option value="shortlet">Shortlet</option>
          </select>
        </FormFieldHolder>
        {["shortlet", "rent", "lease"].includes(listingStatus) && (
          <FormFieldHolder
            label="Rental Duration"
            error={errors?.rentalDuration?.message}
          >
            <select
              disabled={isPending}
              {...register("rentalDuration", {
                required: "Please select a rental duration",
              })}
              id="rental-duration"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
            >
              <option value="" disabled>
                Choose rental duration
              </option>
              {listingStatus === "shortlet" && (
                <>
                  <option value="per_day">Per Day</option>
                  <option value="per_night">Per Night</option>
                  <option value="per_week">Per Week</option>
                </>
              )}
              {listingStatus === "rent" && (
                <>
                  <option value="per_month">Per Month</option>
                  <option value="per_year">Per Year</option>
                </>
              )}
              {listingStatus === "lease" && (
                <>
                  <option value="1_year">1 year</option>
                  <option value="2_year">2 years</option>
                  <option value="3_year_plus">3 years +</option>
                </>
              )}
            </select>
          </FormFieldHolder>
        )}
        <FormFieldHolder
          label={
            <span>
              Inspection Cost{" "}
              <span className="text-emerald-400">
                ₦{Number(watch("inspectionCost") || 0).toLocaleString()}
              </span>
            </span>
          }
          error={errors?.inspectionCost?.message}
        >
          <FormInput
            disabled={isPending}
            {...register("inspectionCost")}
            id="inspection-cost"
            type="number"
            placeholder="Add property inspection cost"
          />
        </FormFieldHolder>
        {user.role === "admin" && (
          <FormFieldHolder
            label="Property Verification"
            error={errors?.verified?.message}
          >
            <select
              disabled={isPending}
              {...register("verified", {
                required: "Verify the listing",
              })}
              id="property-status"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
            >
              <option value="" disabled>
                Verify or Ignore
              </option>
              <option value={true}>Verify</option>
              <option value={false}>Ignore</option>
            </select>
          </FormFieldHolder>
        )}
      </div>
    </>
  );
}
