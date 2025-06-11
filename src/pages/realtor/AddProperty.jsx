import { HiOutlinePaperAirplane, HiOutlineVideoCamera } from "react-icons/hi2";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import IntroHeading from "../../components/IntroHeading";
import { FormInput } from "./FormInput";
import { FormFieldHolder } from "./FormFieldHolder";
import { FormCheckbox } from "./FormCheckbox";
import { Controller, useForm, useWatch } from "react-hook-form";
import GoBackBtn from "../../components/GoBackBtn";
import nodataImg from "../../assets/no-data-found.svg";
import {
  amenitiesList,
  listingVariations,
  listingVariationsAdmin,
  transformDataToObject,
} from "../../helpers/helpers";
import {
  useAddPropertyListing,
  useOnePropertyListing,
} from "../../hooks/useProperty";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import { PropertyImageUpload } from "../../components/PropertyImageUpload";
import Form from "../../components/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useAuth";

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
  } = useForm({ defaultValues: { imagesToKeep: [], videoFile: null } });
  const listingStatus = useWatch({ control, name: "listingStatus" });
  const { addProperty, isPending } = useAddPropertyListing();

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
    }
  }, [property, reset]);

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
    formData.append("imagesToKeep", JSON.stringify(data?.imagesToKeep || []));
    Object.keys(amenities)
      .filter((key) => amenities[key] === true)
      .forEach((amenity) => formData.append("amenities", amenity));
    Object.keys(variations)
      .filter((key) => variations[key] === true)
      .forEach((variation) => formData.append("variations", variation));
    images.forEach((image) => formData.append("images", image));
    addProperty(
      { id, data: formData },
      {
        onSuccess: () => {
          setSelectedImages([]);
          setImagesToKeep([]);
          reset();
          navigate("/app/property-listings");
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
          user.planActivatedAt &&
          user.planExpiresAt &&
          new Date(user.planExpiresAt) > new Date()
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
            <h2 className="mt-20 mb-5 heading-2">Property Details</h2>
            <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-1">
              <FormFieldHolder
                label="Property Title"
                error={errors?.title?.message}
              >
                <FormInput
                  disabled={isPending}
                  {...register("title", { required: "Property title?" })}
                  id="property-title"
                  placeholder="Enter property name"
                />
              </FormFieldHolder>

              <FormFieldHolder
                label="Property Type"
                error={errors?.type?.message}
              >
                <select
                  disabled={isPending}
                  {...register("type", { required: "Property type?" })}
                  id="property-type"
                  className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
                >
                  <option value="">Choose property type</option>
                  <option value="office">Office</option>
                  <option value="flat">Flat</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="mansion">Mansion</option>
                  <option value="land">Land and Plots</option>
                  <option value="apartment">Apartment</option>
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
                  className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
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
                    className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-3xl h-40 px-10 py-5 placeholder:text-slate-500 text-slate-500 resize-none"
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
                  label="Full Address"
                  error={errors?.fullAddress?.message}
                >
                  <FormInput
                    disabled={isPending}
                    {...register("fullAddress", {
                      required: "Full address is?",
                    })}
                    id="full-address"
                    placeholder="Enter property address"
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
            {/* Property Features */}
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
            {/* Select Amenities */}
            <h2 className="mt-20 mb-5 heading-2">
              Amenities / Video Attachments
            </h2>
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
              If you have additional amenities not listed, please include them
              in the{" "}
              <label
                htmlFor="description"
                className="text-blue-500 cursor-pointer"
              >
                Property Description
              </label>
            </p>
            <br />
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

            {/* Select Variations */}
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

export function PropertyVideoUpload({ setValue, videoFile }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoError, setVideoError] = useState("");

  useEffect(() => {
    return () => {
      if (selectedVideo) {
        URL.revokeObjectURL(selectedVideo);
      }
    };
  }, [selectedVideo]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validFormats = ["video/mp4", "video/avi", "video/mov", "video/mkv"];
      if (!validFormats.includes(file.type))
        return setVideoError(
          "Invalid format. Please upload an MP4, AVI, or MOV file."
        );

      if (file.size > 10 * 1024 * 1024)
        return setVideoError(
          "File size too large. Maximum allowed size is 10MB."
        );

      setVideoError("");
      setValue("videoFile", file);
      if (selectedVideo) {
        URL.revokeObjectURL(selectedVideo);
      }

      const newVideoUrl = URL.createObjectURL(file);
      setSelectedVideo(newVideoUrl);
    }
  };
  return (
    <>
      <div className="border-2 border-dashed border-slate-400 min-h-96 rounded-2xl flex flex-col items-center justify-center mb-10 p-5 text-center">
        <Button variation="label" labelFor="video-upload">
          <HiOutlineVideoCamera size={24} />
          <span>Select Video</span>
        </Button>
        <h3 className="heading-2 mt-8">Upload your property video here</h3>
        <p className="text-2xl">
          Recommended: High-quality video (1080p or 720p). Max size: 10MB.
        </p>
        <input
          type="file"
          accept=".mp4,.avi,.mov,.mkv"
          className="hidden"
          id="video-upload"
          onChange={handleVideoChange}
        />
        <p className="text-xl text-gray-500 mt-2">
          Accepted formats: MP4, AVI, MOV | A short 1-2 minute video is ideal.
        </p>
      </div>
      <video controls className="w-full h-[50rem] object-cover rounded-2xl">
        <source src={videoFile?.url} type="video/mp4" />
      </video>
      {selectedVideo && (
        <div className="shadow-md rounded-2xl overflow-hidden">
          <video
            key={selectedVideo}
            controls
            className="w-full h-[50rem] object-cover"
          >
            <source src={selectedVideo} type="video/mp4" />
          </video>
          <p className="text-center p-2 text-slate-500">
            Preview of your selected video
          </p>
        </div>
      )}

      <p className="text-red-500 text-center mt-4">{videoError}</p>
    </>
  );
}
