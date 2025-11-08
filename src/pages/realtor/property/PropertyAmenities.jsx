import { Controller } from "react-hook-form";
import { amenitiesList, transformDataToObject } from "../../../helpers/helpers";
import { FormCheckbox } from "../FormCheckbox";

export default function PropertyAmenities({ property, isPending, control }) {
  return (
    <>
      <h2 className="mt-20 mb-5 heading-2">Amenities / Video Attachments</h2>
      <div className="grid grid-cols-5 gap-10 midtablet:grid-cols-3 midmobile:grid-cols-2 smmobile:grid-cols-1">
        {amenitiesList.map((amenity, index) => {
          const defaultAmenities = transformDataToObject(
            property?.amenities || [],
            amenitiesList
          );
          return (
            <div key={index}>
              <Controller
                disabled={isPending}
                name={`amenities[${amenity}]`}
                control={control}
                defaultValue={defaultAmenities[amenity] || false}
                render={({ field }) => (
                  <FormCheckbox
                    id={amenity}
                    label={amenity}
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
      <p className="text-center text-slate-500 mt-5">
        If you have additional amenities not listed, please include them in the{" "}
        <label htmlFor="description" className="text-blue-500 cursor-pointer">
          Property Description
        </label>
      </p>
    </>
  );
}
