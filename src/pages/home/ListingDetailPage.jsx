import { MdOutlineMyLocation } from "react-icons/md";
import {
  HiMiniLink,
  HiOutlineCalendarDays,
  HiOutlineWallet,
} from "react-icons/hi2";
import { IoBedOutline } from "react-icons/io5";
import { GiHomeGarage } from "react-icons/gi";
import { PiBathtub, PiCookingPotLight, PiResize } from "react-icons/pi";
import { TbZoomInArea } from "react-icons/tb";
import IntroHeading from "../../components/IntroHeading";
import GoBackBtn from "../../components/GoBackBtn";
import { useOnePropertyListing } from "../../hooks/useProperty";
import { Link, useParams } from "react-router-dom";
import { LoaderMd } from "../../static/Loaders";
import moment from "moment";
import PropertyImageCarousel from "../../components/PropertyImageCarousel";
import PropertyFeaturesBox from "../../components/PropertyFeaturesBox";
import PropertyAmenitiesList from "../../components/PropertyAmenitiesList";
import ListDetails from "../../components/ListDetails";
import VideoEmbedUrl from "../../components/VideoEmbedUrl";
import Button from "../../components/Button";
import { SiGitconnected } from "react-icons/si";
import { CiCircleCheck } from "react-icons/ci";
import { LuAlarmClock, LuMousePointer2 } from "react-icons/lu";
import { useState } from "react";
import SafetyPopup from "../../ui/SafetyPopup";
import VideoJS from "../../components/VideoJS";

export default function ListingDetailPage() {
  const [showPopup, setShowPopup] = useState(false);
  const { propertyId: id } = useParams();
  const { isPending, property, realtor } = useOnePropertyListing(id);
  if (!property || isPending) return <LoaderMd />;

  const {
    toilets,
    address: { fullAddress, city, state, country },
    amenities,
    category,
    createdAt,
    updatedAt,
    description,
    features: {
      bedrooms,
      bathrooms,
      garage,
      floorArea,
      kitchen,
      floors,
      landSize,
      yearBuilt,
    },
    images,
    listingStatus,
    price,
    title,
    type,
    videos,
    videoFile,
    propertyId,
    variations,
    verified,
    // inspectionCost,
  } = property;

  console.log(variations);
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    poster: images[0].url, // Optional: first image as video thumbnail
    sources: [
      {
        src: videoFile?.url,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    player.on("waiting", () => {
      console.log("Video is buffering");
    });

    player.on("dispose", () => {
      console.log("Player disposed");
    });
  };

  return (
    <main className="py-10 px-32 midtablet:px-10">
      <GoBackBtn />
      <IntroHeading label="Property overview" />
      <div className="mx-auto rounded-2xl">
        <PropertyImageCarousel images={images} listingStatus={listingStatus} />
        <p className="mt-10 mb-5 font-semibold flex items-center smmobile:flex-col-reverse smmobile:items-start gap-5">
          <span className="text-slate-500 smmobile:hidden">Property ID:</span>{" "}
          {propertyId}
          <span className="text-slate-200 smmobile:hidden">|</span>
          {/* <div>
            {inspectionCost === 0 ? (
              <strong className="text-sky-500 px-10 py-3 bg-sky-50 rounded-xl">
                FREE INSPECTION
              </strong>
            ) : (
              <span className="text-slate-500 italic">
                You charge{" "}
                <strong className="text-sky-500">
                  ₦{inspectionCost.toLocaleString()}
                </strong>{" "}
                for Inspection
              </span>
            )}
          </div> */}
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            View Safety Info
          </button>
          {showPopup && <SafetyPopup onClose={() => setShowPopup(false)} />}
        </p>
        <div className="flex justify-between items-center mb-8 midtablet:flex-col midtablet:items-start midtablet:gap-5">
          <div>
            <h2 className="heading-2 text-6xl mb-5">{title}.</h2>
            <div className="flex items-center">
              {verified && (
                <div
                  className={`cursor-default inline-flex items-center justify-center gap-2 border-dotted border-2 rounded-3xl px-4 text-green-500 border-green-500 mr-2`}
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
                      : el === "New"
                      ? "text-yellow-500 border-yellow-500"
                      : "text-slate-500 border-slate-500"
                  } mr-2`}
                >
                  {el === "Featured" && <LuMousePointer2 />}
                  <span className="text-[12px]">{el}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-5 text-slate-600 items-center">
              <MdOutlineMyLocation size={24} className="text-blue-500" />
              <address className="not-italic">{fullAddress}</address>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <Button variation="link" link={`/property-inquiry-form/${id}`}>
              <SiGitconnected size={24} />
              <span>Make Inquiry</span>
            </Button>
            <Link to={`/property-inspection-form/${id}`}>
              <Button variation="button" color="from-sky-300 to-sky-600">
                <LuAlarmClock size={24} />
                <span>Schedule Inspection</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5 my-10">
          <HiOutlineWallet
            size={45}
            className="p-3 bg-gradient-to-br from-green-100 to-green-200 text-green-700 rounded-xl"
          />
          <span className="text-slate-600 text-5xl font-semibold">
            ₦ {price.toLocaleString()}
          </span>
        </div>
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
              icon={
                <HiOutlineCalendarDays size={28} className="text-blue-500" />
              }
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
              icon={<PiResize size={28} className="text-blue-500" />}
            />
          )}
        </div>
        <h3 className="heading-2 text-5xl mt-20 mb-5">Description</h3>
        <p className="text-slate-500 text-3xl leading-[1.7]">{description}</p>
        <h3 className="heading-2 text-5xl mt-20 mb-5">Amenities</h3>
        <ul className="grid grid-cols-4 gap-10 mt-5 mb-24 bigmobile:grid-cols-2 smmobile:grid-cols-1">
          {amenities.map((amenity, index) => (
            <PropertyAmenitiesList key={index} label={amenity} />
          ))}
        </ul>

        {videoFile?.url ? (
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        ) : (
          videos && <VideoEmbedUrl videos={videos} />
        )}
        <h3 className="heading-2 text-5xl mt-20 mb-3">Additional Details</h3>
        <ul className="list mb-16">
          <ListDetails
            title="Realtor"
            details={
              <Link
                to={`/realtor-detail/${realtor.profile}`}
                className="flex gap-3 hover:text-blue-500 transition-all ease-linear"
              >
                {realtor.fullname}
                <HiMiniLink size={16} />
              </Link>
            }
          />
          <ListDetails
            title="Date Added"
            details={moment(createdAt).format("LLL")}
          />
          <ListDetails
            title="Date Updated"
            details={moment(updatedAt).format("LLL")}
          />
          <ListDetails title="City / LGA" details={city} />
          <ListDetails title="State" details={state} />
          <ListDetails title="Country" details={country} />
          <ListDetails title="Type" details={type} />
          <ListDetails title="Category" details={category} />
        </ul>
      </div>
    </main>
  );
}
