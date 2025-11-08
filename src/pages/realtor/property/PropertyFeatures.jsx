import { FormFieldHolder } from "../FormFieldHolder";
import { FormInput } from "../FormInput";

export default function PropertyFeatures({ isPending, register, property }) {
  return (
    <>
      <h2 className="mt-20 mb-5 heading-2">Property Features</h2>
      <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-2">
        <FormFieldHolder label="Bedrooms">
          <FormInput
            disabled={isPending}
            {...register("bedrooms")}
            id="bedroom"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.bedrooms}
          />
        </FormFieldHolder>
        <FormFieldHolder label="Bathrooms">
          <FormInput
            disabled={isPending}
            {...register("bathrooms")}
            id="bathroom"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.bathrooms}
          />
        </FormFieldHolder>
        <FormFieldHolder label="Garage">
          <FormInput
            disabled={isPending}
            {...register("garage")}
            id="garage"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.garage}
          />
        </FormFieldHolder>
        <FormFieldHolder label="Kitchens">
          <FormInput
            disabled={isPending}
            {...register("kitchen")}
            id="kitchen"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.kitchen}
          />
        </FormFieldHolder>
        <FormFieldHolder label="Floors">
          <FormInput
            disabled={isPending}
            {...register("floors")}
            id="floors"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.floors}
          />
        </FormFieldHolder>
        <FormFieldHolder label="Floor Area (sq. ft)">
          <FormInput
            disabled={isPending}
            {...register("floorArea")}
            id="floor-area"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.floorArea}
          />
        </FormFieldHolder>
        <FormFieldHolder label="Land Size (sq. ft)">
          <FormInput
            disabled={isPending}
            {...register("landSize")}
            id="floor-area"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.landSize}
          />
        </FormFieldHolder>
        <FormFieldHolder label="Toilets">
          <FormInput
            disabled={isPending}
            {...register("toilets")}
            id="toilets"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.toilets}
          />
        </FormFieldHolder>
        <FormFieldHolder label="Year Built">
          <FormInput
            disabled={isPending}
            {...register("yearBuilt")}
            id="year"
            type="number"
            placeholder="0"
            defaultValue={property?.features?.yearBuilt}
          />
        </FormFieldHolder>
      </div>
    </>
  );
}
