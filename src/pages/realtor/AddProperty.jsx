import { HiOutlinePaperAirplane } from "react-icons/hi2";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import IntroHeading from "../../components/IntroHeading";
import { FormInput } from "./FormInput";
import { FormFieldHolder } from "./FormFieldHolder";
import { useForm, useWatch } from "react-hook-form";
import GoBackBtn from "../../components/GoBackBtn";
import nodataImg from "../../assets/no-data-found.svg";
import {
  amenitiesList,
  listingVariations,
  transformDataToObject,
} from "../../helpers/helpers";
import {
  useAddPropertyListing,
  useDeleteLegalDocument,
  useOnePropertyListing,
} from "../../hooks/useProperty";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import { PropertyImageUpload } from "../../components/PropertyImageUpload";
import Form from "../../components/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useAuth";
import PropertyDetails from "./property/PropertyDetails.jsx";
import PropertyFeatures from "./property/PropertyFeatures";
import PropertyAmenities from "./property/PropertyAmenities";
import PropertyHighlights from "./property/PropertyHighlights";
import PropertyVariations from "./property/PropertyVariations";
import PropertyVideoUpload from "./property/PropertyVideoUpload";
import PropertyLegalDocuments from "./property/PropertyLegalDocuments";
// import { useFormPersist } from "../../hooks/useFormPersist";

export default function AddProperty() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesToKeep, setImagesToKeep] = useState([]);
  const { id } = useParams();
  const { isPending: isLoading, property } = useOnePropertyListing(id);
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    setError,
  } = useForm({
    defaultValues: { imagesToKeep: [], videoFile: null, legalDocuments: [] },
  });
  // useFormPersist("propertyFormDraft", watch, setValue);
  const listingStatus = useWatch({ control, name: "listingStatus" });
  const { addProperty, isPending } = useAddPropertyListing();
  const { isPending: isDeletingDoc, deleteDoc } = useDeleteLegalDocument(
    property?._id
  );

  useEffect(() => {
    if (property) {
      reset({
        ...property,
        imagesToKeep: property?.images || [],
        amenities: transformDataToObject(
          property.amenities || [],
          amenitiesList
        ),
        variations: transformDataToObject(
          property.variations || [],
          listingVariations
        ),
        videos: property.videos || "",
      });
      setImagesToKeep(property?.images || []);
      setValue("legalDocuments", []);
    }
  }, [property, reset, setValue]);

  function onSubmit(data) {
    const {
      title,
      type,
      category,
      description,
      price,
      fullAddress,
      city,
      state,
      country,
      listingStatus,
      bedrooms,
      bathrooms,
      garage,
      kitchen,
      floors,
      floorArea,
      landSize,
      yearBuilt,
      amenities,
      videos,
      toilets,
      variations,
      verified,
      inspectionCost,
      rentalDuration,
      videoFile,
      urgencyTag,
      negotiableStatus,
      specialOffer,
      notablePoint,
      legalDocuments,
    } = data || property;

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("verified", verified);
    formData.append("title", title);
    formData.append("type", type);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", +price);
    formData.append("listingStatus", listingStatus);
    formData.append("fullAddress", fullAddress);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("bedrooms", +bedrooms);
    formData.append("bathrooms", +bathrooms);
    formData.append("garage", +garage);
    formData.append("kitchen", +kitchen);
    formData.append("floors", +floors);
    formData.append("floorArea", +floorArea);
    formData.append("landSize", +landSize);
    formData.append("yearBuilt", +yearBuilt);
    formData.append("toilets", +toilets);
    formData.append("videos", videos);
    formData.append("inspectionCost", inspectionCost);
    formData.append("rentalDuration", rentalDuration);
    formData.append("urgencyTag", urgencyTag);
    formData.append("negotiableStatus", negotiableStatus);
    formData.append("specialOffer", specialOffer);
    formData.append("notablePoint", notablePoint);
    formData.append("imagesToKeep", JSON.stringify(data?.imagesToKeep || []));
    Object.keys(amenities)
      .filter((key) => amenities[key] === true)
      .forEach((amenity) => formData.append("amenities", amenity));
    Object.keys(variations)
      .filter((key) => variations[key] === true)
      .forEach((variation) => formData.append("variations", variation));
    images.forEach((image) => formData.append("images", image));

    if (legalDocuments && legalDocuments.length > 0) {
      const legalDocumentsData = [];

      legalDocuments.forEach((doc) => {
        if (doc.file) {
          formData.append("legalDocuments", doc.file);
          legalDocumentsData.push({
            name: doc.label || "other",
            notes: "",
            issuedDate: null,
          });
        }
      });

      formData.append("legalDocumentsData", JSON.stringify(legalDocumentsData));
    }
    addProperty(
      { id, data: formData },
      {
        onSuccess: () => {
          localStorage.removeItem("propertyFormDraft");
          setSelectedImages([]);
          setImagesToKeep([]);
          reset();
          if (user?.role === "realtor") navigate("/app/property-listings");
          else {
            if (property) navigate(`/app/manage-property/${property?._id}`);
            else navigate(`/app/all-property-listings`);
          }
        },
      }
    );
  }

  return (
    <>
      {isLoading ? (
        <LoaderMd />
      ) : user.verified ? (
        <>
          <div className="text-center my-20 flex flex-col items-center">
            <img src={nodataImg} className="w-96" />
            <h2 className="heading-2 my-5 capitalize">You are NOT Verified</h2>
            <p className="text-slate-500 mb-10">
              You are not verified yet to{" "}
              <strong>
                <em>Add Property</em>
              </strong>
              .
            </p>
            <Link to="/profile-verification">
              <Button>Verification</Button>
            </Link>
          </div>
        </>
      ) : !(
          user?.hasLifeTimeAccess ||
          (user.planActivatedAt &&
            user.planExpiresAt &&
            new Date(user.planExpiresAt) > new Date())
        ) && user.role !== "admin" ? (
        <div className="text-center my-20 flex flex-col items-center">
          <img src={nodataImg} className="w-96" />
          <h2 className="heading-2 my-5 capitalize">Subscription Required</h2>
          <p className="text-slate-500 mb-10">
            You need an active subscription to{" "}
            <strong>
              <em>Add Property</em>
            </strong>
            .
          </p>
          <Link to="/pricings">
            <Button>View Plans & Subscribe</Button>
          </Link>
        </div>
      ) : (
        <>
          <GoBackBtn />
          <IntroHeading label={`${id ? "Update" : "Add"} Property Listing`} />
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Upload */}
            <PropertyImageUpload
              setImages={setImages}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              register={register}
              errors={errors}
              existingImages={imagesToKeep}
              onRemoveExistingImage={(image) => {
                const updatedImages = imagesToKeep.filter(
                  (img) => img !== image
                );
                setImagesToKeep(updatedImages);
                setValue("imagesToKeep", updatedImages);
              }}
            />
            {/* Property Details */}
            <PropertyDetails
              errors={errors}
              isPending={isPending}
              listingStatus={listingStatus}
              user={user}
              property={property}
              register={register}
              watch={watch}
            />

            {/* Property Features */}
            <PropertyFeatures
              isPending={isPending}
              register={register}
              property={property}
            />

            {/* Select Amenities */}
            <PropertyAmenities
              control={control}
              isPending={isPending}
              property={property}
            />
            <br />

            {/* Add Video URL */}
            <FormFieldHolder label="Video URL">
              <FormInput
                disabled={isPending}
                {...register("videos")}
                id="video-url"
                placeholder="Youtube or Facebook or Vimeo Video URL"
              />
            </FormFieldHolder>

            <p className="my-6 italic text-[1.4rem] text-slate-500 text-center">
              OR
            </p>

            {/* Upload Video */}
            <PropertyVideoUpload
              setValue={setValue}
              videoFile={property?.videoFile}
            />

            {/* Highlights & Notable Points */}
            <PropertyHighlights errors={errors} register={register} />

            {/* Legal Documents */}
            <PropertyLegalDocuments
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              clearErrors={clearErrors}
              setError={setError}
              property={property}
              isDeletingDoc={isDeletingDoc}
              deleteDoc={deleteDoc}
            />

            {/* Transparent Fees & Terms */}
            {/* <PropertyFeesAndTerms /> */}

            {/* Select Variations */}
            <PropertyVariations
              control={control}
              isPending={isPending}
              property={property}
              user={user}
            />
            <br />
            <br />

            {/* Submit Property to Admin */}
            <Button disabled={isPending}>
              {isPending ? (
                <LoaderSm />
              ) : (
                <>
                  <span>{id ? "Update" : "Submit"} Property Listing</span>
                  <HiOutlinePaperAirplane size={24} />
                </>
              )}
            </Button>
          </Form>
        </>
      )}
    </>
  );
}
