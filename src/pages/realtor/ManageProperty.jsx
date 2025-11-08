import { PiShootingStar } from "react-icons/pi";
import IntroHeading from "../../components/IntroHeading";
import GoBackBtn from "../../components/GoBackBtn";
import {
  useDeleteLegalDocument,
  useDeletePropertyListing,
  useOnePropertyListing,
  useUpdateListingReviewStatus,
} from "../../hooks/useProperty";
import { useParams } from "react-router-dom";
import { LoaderMd } from "../../static/Loaders";
import PropertyImageCarousel from "../../components/PropertyImageCarousel";
import PropertyAmenitiesList from "../../components/PropertyAmenitiesList";
// import VideoEmbedUrl from "../../components/VideoEmbedUrl";
import { useState } from "react";
import { useUser } from "../../hooks/useAuth";
// import VideoJS from "../../components/VideoJS";
import { NoMessage } from "../../components/NoDataMsg";
import { BsHouseHeart } from "react-icons/bs";
import PropertyId from "./propertyDetails/PropertyId";
import PropertyBasicDetails from "./propertyDetails/PropertyBasicDetails";
import PropertyFeatureWrap from "./propertyDetails/PropertyFeatureWrap";
import PropertyUnderReviewStatus from "./propertyDetails/PropertyUnderReviewStatus";
import PropertyVideoRender from "./propertyDetails/PropertyVideoRender";
import PropertyAdditionalDetails from "./propertyDetails/PropertyAdditionalDetails";
import PropertyCallToActions from "./propertyDetails/PropertyCallToActions";
import PropertyLegalDocs from "./propertyDetails/PropertyLegalDocs";
// import TransparentFeesAndTerms from "./propertyDetails/TransparentFeesTerms";

export default function ManageProperty() {
  const { propertyId: id } = useParams();
  const { isPending, property, realtor, error } = useOnePropertyListing(id);
  const { updateReviewStatus, isPending: isLoading } =
    useUpdateListingReviewStatus();
  const { deleteListing, isPending: isDeleting } = useDeletePropertyListing(
    property?._id
  );
  const { isPending: isDeletingDoc, deleteDoc } = useDeleteLegalDocument(
    property?._id
  );
  const [reason, setReason] = useState("");
  const { user } = useUser();

  if (isPending) return <LoaderMd />;

  if (error) return <NoMessage model="Property Detail" option={false} />;

  if (!property) return <LoaderMd />;

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
    urgencyTag,
    // negotiableStatus,
    specialOffer,
    notablePoint,
    legalDocuments,
  } = property;

  const existingDocs = legalDocuments.map((doc) => ({
    id: doc._id,
    label: doc.name || "",
    file: null,
    previewUrl: doc.fileUrl,
    type: doc.fileUrl?.toLowerCase().includes(".pdf")
      ? "application/pdf"
      : "image/*",
    verified: doc.verified,
    size: doc.size,
  }));
  return (
    <>
      <GoBackBtn />
      <IntroHeading label="Property overview" />
      <div className="mx-auto bg-white shadow shadow-slate-200 rounded-2xl p-10 smtablet:p-3">
        <PropertyImageCarousel
          images={images}
          listingStatus={listingStatus}
          urgencyTag={urgencyTag}
        />
        <PropertyId inspectionCost={inspectionCost} propertyId={propertyId} />
        <PropertyBasicDetails
          _id={_id}
          fullAddress={fullAddress}
          price={price}
          rentalDuration={rentalDuration}
          title={title}
          variations={variations}
          verified={verified}
        />
        {specialOffer && (
          <div className="p-5 px-10 mb-10 inline-flex items-center gap-5 bg-gradient-to-b from-yellow-100 to-yellow-200 text-yellow-600 rounded-3xl">
            <PiShootingStar size={32} className="flex-shrink-0 self-start" />
            <span>{specialOffer}</span>
          </div>
        )}

        <PropertyFeatureWrap
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          garage={garage}
          floorArea={floorArea}
          kitchen={kitchen}
          floors={floors}
          landSize={landSize}
          yearBuilt={yearBuilt}
          toilets={toilets}
        />
        <h3 className="heading-2 text-5xl mt-20 mb-5">Description</h3>
        <p className="text-slate-500 text-3xl leading-[1.7]">{description}</p>

        {notablePoint && (
          <div className="flex justify-center">
            <div className="p-5 px-10 mt-10 inline-flex  items-center gap-5 bg-gradient-to-b from-blue-100 to-blue-200 text-blue-600 rounded-3xl">
              <BsHouseHeart size={32} className="flex-shrink-0 self-start" />
              <span>{notablePoint}</span>
            </div>
          </div>
        )}

        <h3 className="heading-2 text-5xl mt-20 mb-5">Amenities</h3>
        <ul className="grid grid-cols-4 gap-10 mt-5 bigmobile:grid-cols-2 smmobile:grid-cols-1">
          {amenities.map((amenity, index) => (
            <PropertyAmenitiesList key={index} label={amenity} />
          ))}
        </ul>

        <PropertyUnderReviewStatus reviewStatus={reviewStatus} />

        <PropertyVideoRender
          images={images}
          title={title}
          videoFile={videoFile}
          videos={videos}
        />

        <PropertyAdditionalDetails
          category={category}
          city={city}
          country={country}
          createdAt={createdAt}
          updatedAt={updatedAt}
          realtor={realtor}
          state={state}
          type={type}
        />

        {/* <TransparentFeesAndTerms /> */}

        {existingDocs.length > 0 && (
          <PropertyLegalDocs
            existingDocs={existingDocs}
            isDeletingDoc={isDeletingDoc}
            deleteDoc={deleteDoc}
          />
        )}
        <PropertyCallToActions
          _id={_id}
          deleteListing={deleteListing}
          isDeleting={isDeleting}
          isLoading={isLoading}
          reason={reason}
          reviewStatus={reviewStatus}
          setReason={setReason}
          title={title}
          updateReviewStatus={updateReviewStatus}
          user={user}
        />
      </div>
    </>
  );
}
