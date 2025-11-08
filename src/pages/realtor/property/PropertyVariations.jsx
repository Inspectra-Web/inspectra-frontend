import { Controller } from "react-hook-form";
import { FormCheckbox } from "../FormCheckbox";
import {
  listingVariations,
  listingVariationsAdmin,
  transformDataToObject,
} from "../../../helpers/helpers";

export default function PropertyVariations({
  user,
  property,
  isPending,
  control,
}) {
  return (
    <>
      {" "}
      <h2 className="mt-20 mb-5 heading-2">Choose Listing Variations</h2>
      <div className="grid grid-cols-5 gap-10 midtablet:grid-cols-3 midmobile:grid-cols-2 smmobile:grid-cols-1">
        {(user?.role === "admin"
          ? listingVariationsAdmin
          : listingVariations
        ).map((variation, index) => {
          const defaultVariations = transformDataToObject(
            property?.variations || [],
            listingVariations
          );
          return (
            <div key={index}>
              <Controller
                disabled={isPending}
                name={`variations[${variation}]`}
                control={control}
                defaultValue={defaultVariations[variation] || false}
                render={({ field }) => (
                  <FormCheckbox
                    id={variation}
                    label={variation}
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    ref={field.ref}
                  />
                )}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
