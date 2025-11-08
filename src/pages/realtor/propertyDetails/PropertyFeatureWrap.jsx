import PropertyFeaturesBox from "../../../components/PropertyFeaturesBox";
import {
  PiBathtub,
  PiCookingPotLight,
  PiResize,
  PiToilet,
} from "react-icons/pi";
import { IoBedOutline } from "react-icons/io5";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { GiHomeGarage } from "react-icons/gi";
import { TbZoomInArea } from "react-icons/tb";

export default function PropertyFeatureWrap({
  toilets,
  bedrooms,
  bathrooms,
  kitchen,
  garage,
  yearBuilt,
  floorArea,
  floors,
  landSize,
}) {
  return (
    <div className="flex gap-8 midtablet:flex-wrap">
      {bedrooms > 0 && (
        <PropertyFeaturesBox
          featureText="Bedrooms"
          numberText={bedrooms}
          icon={<IoBedOutline size={28} className="text-blue-500" />}
        />
      )}
      {bathrooms > 0 && (
        <PropertyFeaturesBox
          featureText="Bathrooms"
          numberText={bathrooms}
          icon={<PiBathtub size={28} className="text-blue-500" />}
        />
      )}
      {kitchen > 0 && (
        <PropertyFeaturesBox
          featureText="Kitchen"
          numberText={kitchen}
          icon={<PiCookingPotLight size={28} className="text-blue-500" />}
        />
      )}
      {garage > 0 && (
        <PropertyFeaturesBox
          featureText="Garage"
          numberText={garage}
          icon={<GiHomeGarage size={28} className="text-blue-500" />}
        />
      )}
      {yearBuilt > 0 && (
        <PropertyFeaturesBox
          featureText="Year built"
          numberText={yearBuilt}
          icon={<HiOutlineCalendarDays size={28} className="text-blue-500" />}
        />
      )}
      {floorArea > 0 && (
        <PropertyFeaturesBox
          featureText="Floor Area"
          numberText={floorArea}
          unit="sq ft"
          icon={<TbZoomInArea size={28} className="text-blue-500" />}
        />
      )}
      {landSize > 0 && (
        <PropertyFeaturesBox
          featureText="Land Size"
          numberText={landSize}
          unit="sq ft"
          icon={<PiResize size={28} className="text-blue-500" />}
        />
      )}
      {floors > 0 && (
        <PropertyFeaturesBox
          featureText="Floors"
          numberText={floors}
          icon={<PiResize size={28} className="text-blue-500" />}
        />
      )}
      {toilets > 0 && (
        <PropertyFeaturesBox
          featureText="Toilets"
          numberText={toilets}
          icon={<PiToilet size={28} className="text-blue-500" />}
        />
      )}
    </div>
  );
}
