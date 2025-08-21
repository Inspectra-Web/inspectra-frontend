import { MdOutlineMyLocation } from "react-icons/md";
import Button from "../../components/Button";
import {
  HiMiniLink,
  HiOutlineCalendarDays,
  HiOutlinePaperAirplane,
  HiOutlineTrash,
  HiOutlineWallet,
  HiXMark,
} from "react-icons/hi2";
import { IoBedOutline } from "react-icons/io5";
import { GiHomeGarage } from "react-icons/gi";
import {
  PiBathtub,
  PiCookingPotLight,
  PiResize,
  PiToilet,
} from "react-icons/pi";
import { TbZoomInArea } from "react-icons/tb";
import IntroHeading from "../../components/IntroHeading";
import GoBackBtn from "../../components/GoBackBtn";
import {
  useDeletePropertyListing,
  useOnePropertyListing,
  useUpdateListingReviewStatus,
} from "../../hooks/useProperty";
import { Link, useParams } from "react-router-dom";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import moment from "moment";
import PropertyImageCarousel from "../../components/PropertyImageCarousel";
import PropertyFeaturesBox from "../../components/PropertyFeaturesBox";
import PropertyAmenitiesList from "../../components/PropertyAmenitiesList";
import ListDetails from "../../components/ListDetails";
import VideoEmbedUrl from "../../components/VideoEmbedUrl";
import { useState } from "react";
import { useUser } from "../../hooks/useAuth";
import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { HandleConfirmation } from "../../ui/ConfirmationPrompt";
import { LuMousePointer2 } from "react-icons/lu";
import VideoJS from "../../components/VideoJS";
import { getRentalDuration } from "../../helpers/helpers";

export default function ManageProperty() {
  const { propertyId: id } = useParams();
  const { isPending, property, realtor } = useOnePropertyListing(id);
  const { updateReviewStatus, isPending: isLoading } =
    useUpdateListingReviewStatus();
  const { deleteListing, isPending: isDeleting } = useDeletePropertyListing(
    property?._id
  );
  const [reason, setReason] = useState("");
  const { user } = useUser();

  if (!property || isPending) return <LoaderMd />;

  const {
    _id,
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
      toilets,
    },
    images,
    listingStatus,
    price,
    reviewStatus,
    title,
    type,
    videos,
    videoFile,
    propertyId,
    variations,
    verified,
    inspectionCost,
    rentalDuration,
  } = property;
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
      return "Video is buffering";
    });

    player.on("dispose", () => {
      return "Player disposed";
    });
  };
  return (
    <>
      <GoBackBtn />
      <IntroHeading label="Property overview" />
      <div className="mx-auto bg-white shadow shadow-slate-200 rounded-2xl p-10 smtablet:p-3">
        <PropertyImageCarousel images={images} listingStatus={listingStatus} />
        <p className="mt-10 mb-5 font-semibold flex items-center smmobile:flex-col-reverse smmobile:items-start gap-5">
          <span className="text-slate-500 midmobile:hidden">Property ID:</span>{" "}
          {propertyId}
          <span className="text-slate-200 smmobile:hidden">|</span>
          <div>
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
          </div>
        </p>
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
              icon={<PiToilet size={28} className="text-blue-500" />}
            />
          )}
        </div>
        <h3 className="heading-2 text-5xl mt-20 mb-5">Description</h3>
        <p className="text-slate-500 text-3xl leading-[1.7]">{description}</p>
        <h3 className="heading-2 text-5xl mt-20 mb-5">Amenities</h3>
        <ul className="grid grid-cols-4 gap-10 mt-5 bigmobile:grid-cols-2 smmobile:grid-cols-1">
          {amenities.map((amenity, index) => (
            <PropertyAmenitiesList key={index} label={amenity} />
          ))}
        </ul>
        <p
          className={`mt-10 mb-20 p-8 bg-gradient-to-t ${
            reviewStatus == "pending"
              ? "from-yellow-500 to-yellow-600"
              : reviewStatus === "approved"
              ? " from-green-500 to-green-600"
              : "from-red-500 to-red-500"
          } text-white text-center rounded-3xl mt-20`}
        >
          {reviewStatus === "pending"
            ? "Thank you for submitting your property listing! Our team at Inspectra has received it and will get back to you within 48 hours."
            : reviewStatus === "approved"
            ? "Congratulations! Your property has been approved and is now live on the Inspectra Listing page."
            : "Unfortunately, your property listing did not meet our guidelines. Please review the requirements in your MAIL and feel free to notify the team after making the necessary adjustments."}
        </p>
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
                to={`/app/profile/${realtor.profile}`}
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
        {user?.role === "admin" && (
          <>
            <label
              htmlFor="rejection-reason"
              className="text-slate-500 text-3xl inline-block mb-3 font-semibold"
            >
              Rejection Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              id="rejection-reason"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-3xl h-40 w-full px-10 py-5 placeholder:text-slate-500 text-slate-500 resize-none"
              placeholder="Are you rejecting this listing?"
            ></textarea>

            <div className="flex flex-wrap gap-5 mt-10">
              {reviewStatus !== "approved" && !reason && (
                <Button
                  disabled={isLoading}
                  onClick={() =>
                    HandleConfirmation(
                      () =>
                        updateReviewStatus({
                          id: _id,
                          data: { reviewStatus: "approved" },
                        }),
                      <p>
                        You are about to publish{" "}
                        <span className="font-semibold uppercase">{title}</span>{" "}
                        listing on Inspectra.
                      </p>
                    )
                  }
                >
                  {isLoading ? (
                    <LoaderSm />
                  ) : (
                    <>
                      <span>Publish</span>
                      <HiOutlinePaperAirplane size={24} />
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={() =>
                  HandleConfirmation(
                    () =>
                      updateReviewStatus(
                        {
                          id: _id,
                          data: {
                            reviewStatus: "rejected",
                            rejectionReason: reason,
                          },
                        },
                        { onSuccess: () => setReason("") }
                      ),
                    <p>
                      You are about to reject{" "}
                      <span className="font-semibold uppercase">{title}</span>{" "}
                      listing on Inspectra.
                    </p>
                  )
                }
                disabled={!reason && isLoading}
                color="from-rose-500 to-rose-700 ring-rose-300"
              >
                {isLoading ? (
                  <LoaderSm />
                ) : (
                  <>
                    <span>Reject</span>
                    <HiXMark size={24} />
                  </>
                )}
              </Button>
              {!reason && (
                <Button
                  disabled={isDeleting}
                  onClick={() =>
                    HandleConfirmation(
                      () => deleteListing(),
                      <p>
                        You are about to delete{" "}
                        <span className="font-semibold uppercase">{title}</span>{" "}
                        listing on Inspectra. Actions may not be reversed.
                      </p>
                    )
                  }
                  variation="delete"
                >
                  {isDeleting ? (
                    <LoaderSm />
                  ) : (
                    <>
                      <HiOutlineTrash size={24} />
                      <span>Unlist Property</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        )}
        {user?.role === "realtor" && (
          <Button
            disabled={isDeleting}
            onClick={() =>
              HandleConfirmation(
                () => deleteListing(),
                "You are about to delete a listing. Actions may not be reversed."
              )
            }
            variation="delete"
          >
            {isDeleting ? (
              <LoaderSm />
            ) : (
              <>
                <HiOutlineTrash size={24} />
                <span>Unlist Property</span>
              </>
            )}
          </Button>
        )}
      </div>
    </>
  );
}
