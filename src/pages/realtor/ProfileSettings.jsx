import { HiOutlinePaperAirplane } from "react-icons/hi";
import Button from "../../components/Button";
import Form from "../../components/Form";
import IntroHeading from "../../components/IntroHeading";
import { useUser } from "../../hooks/useAuth";
import { useReadProfile, useUpdateProfile } from "../../hooks/useProfile";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import { useForm } from "react-hook-form";
import { FormFieldHolder } from "./FormFieldHolder";
import { FormInput } from "./FormInput";
import { IoImagesOutline } from "react-icons/io5";
import { useState } from "react";
import { handleFileChange } from "../../helpers/FileReader";
import { defaultAvatar } from "../../helpers/helpers";
import { useParams } from "react-router-dom";
import GoBackBtn from "../../components/GoBackBtn";

export default function ProfileSettings() {
  const { profileId, userId } = useParams();
  const { user } = useUser();
  const { isPending, profile } = useReadProfile(profileId || user?.profile);
  const { isPending: isUpdating, updateData } = useUpdateProfile();
  const { register, watch, handleSubmit } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");

  if (!profile) return <LoaderMd />;

  function onSubmit(formData) {
    const updateProfile = {
      ...formData,
      qualifications: {
        certification: formData.certification,
        education: formData.education,
      },
      socialLinks: {
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedIn: formData.linkedIn,
        instagram: formData.instagram,
      },
    };

    if (selectedImage) {
      updateProfile.avatar = selectedImage.file;
      setSelectedImage(null);
    }

    updateData({ id: userId || user._id, data: updateProfile });
  }

  const {
    firstname,
    middlename,
    lastname,
    email,
    specialization,
    availabilityStatus,
    contactMeans,
    gender,
    city,
    state,
    country,
    telephone,
    bio,
    houseAddress,
    whatsapp,
    socialLinks: { facebook, twitter, linkedIn, instagram },
    license,
    experience,
    properties,
    agency,
    agencyAddress,
    region,
    qualifications,
    language,
    avatar,
    role,
    consultationCost,
  } = profile;

  return (
    <>
      {isPending && <LoaderMd />}
      <GoBackBtn />
      <IntroHeading label="Profile Settings" />
      <Form onSubmit={handleSubmit(onSubmit)} width="max-w-full">
        <h2 className="mb-5 heading-2">Upload Profile Photo</h2>
        <div className="mb-20 flex gap-2 midmobile:flex-col">
          <div className="border-2 border-dashed border-slate-400 min-h-96 w-1/2 midtablet:w-full rounded-2xl flex flex-col items-center justify-center text-center p-5">
            <Button variation="label" labelFor="upload">
              <IoImagesOutline size={24} />
              <span>Select Photo</span>
            </Button>
            <h3 className="heading-2 mt-8">Upload your profile photo</h3>
            <p className="text-2xl text-orange-700">
              Note: Please upload a clear profile photo of your face. Avoid
              uploading images of objects, landscapes, or other people.
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload"
              onChange={(e) => handleFileChange(e, setSelectedImage, setError)}
            />
            {error && <p className="text-red-500">{error}</p>}
            {selectedImage && (
              <img
                src={selectedImage.src}
                alt={selectedImage.name}
                className="border-2 border-dashed border-slate-400 h-[28rem] w-[28rem] object-cover rounded-full mt-10"
              />
            )}
          </div>
          <div className="min-h-96 w-1/2 midtablet:w-full rounded-2xl flex flex-col items-center justify-center text-center p-5 bg-gradient-to-tr from-blue-700 to-blue-900">
            <img
              src={avatar || defaultAvatar(gender)}
              alt={`Photo of ${user?.fullname}`}
              className="h-[28rem] w-[28rem] object-cover rounded-full"
              loading="lazy"
            />
          </div>
        </div>
        <h2 className="mb-5 heading-2">Self Summary</h2>
        <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-1">
          <FormFieldHolder label="First Name">
            <FormInput
              id="first-name"
              placeholder="Franklin"
              defaultValue={firstname}
              {...register("firstname")}
              disabled={firstname}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Last Name">
            <FormInput
              id="last-name"
              placeholder="Diri"
              defaultValue={middlename}
              {...register("middlename")}
              disabled={middlename}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Middle Name">
            <FormInput
              id="middle-name"
              placeholder="Osas"
              defaultValue={lastname}
              {...register("lastname")}
              disabled={lastname}
            />
          </FormFieldHolder>
          <div className="col-span-3 midmobile:col-span-1">
            <FormFieldHolder label="Self Description">
              <textarea
                id="description"
                defaultValue={bio}
                className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-3xl h-40 px-10 py-5 placeholder:text-slate-500 text-slate-500 resize-none"
                placeholder="Let's know you more"
                {...register("bio")}
              ></textarea>
            </FormFieldHolder>
          </div>
          <FormFieldHolder label="Email Address">
            <FormInput
              type="email"
              id="email"
              placeholder="example@gmail.com"
              defaultValue={email}
              disabled={true}
            />
          </FormFieldHolder>
          <div className="col-span-2 midmobile:col-span-1">
            <FormFieldHolder label="House Address">
              <FormInput
                type="address"
                id="address"
                placeholder="Enter your address"
                defaultValue={houseAddress}
                {...register("houseAddress")}
              />
            </FormFieldHolder>
          </div>
          <FormFieldHolder label="City">
            <FormInput
              id="city"
              defaultValue={city}
              placeholder="Enter city name"
              {...register("city")}
            />
          </FormFieldHolder>

          <FormFieldHolder label="State / Province">
            <FormInput
              id="state"
              defaultValue={state}
              placeholder="Enter state name"
              {...register("state")}
            />
          </FormFieldHolder>

          <FormFieldHolder label="Country">
            <FormInput
              id="country"
              defaultValue={country}
              placeholder="Enter country name"
              {...register("country")}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Telephone">
            <FormInput
              id="telephone"
              defaultValue={telephone}
              placeholder="Enter phone number"
              {...register("telephone")}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Whatsapp">
            <FormInput
              id="whatsapp"
              defaultValue={whatsapp}
              placeholder="Enter whatsapp contact"
              {...register("whatsapp")}
            />
          </FormFieldHolder>

          <FormFieldHolder label="Language">
            <FormInput
              id="languages"
              defaultValue={language}
              placeholder="e.g: English, Igbo, Hausa"
              {...register("language")}
            />
          </FormFieldHolder>
          <FormFieldHolder
            label={
              <span>
                Consultation Cost{" "}
                <span className="text-emerald-400">
                  ₦{Number(watch("consultationCost") || 0).toLocaleString()}
                </span>
              </span>
            }
          >
            <FormInput
              disabled={isPending}
              id="inspection-cost"
              type="number"
              placeholder="Add property inspection cost"
              {...register("consultationCost")}
              defaultValue={consultationCost}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Gender">
            <select
              id="gender"
              defaultValue={gender}
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
              {...register("gender")}
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </FormFieldHolder>
          {user?.role === "admin" && (
            <FormFieldHolder label="Role">
              <select
                id="role"
                defaultValue={role}
                className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
                {...register("role")}
                disabled={isPending}
              >
                <option value="">Select user roles</option>
                <option value="realtor">Realtor</option>
                <option value="admin">Admin</option>
              </select>
            </FormFieldHolder>
          )}
        </div>
        <h2 className="mt-20 mb-5 heading-2">Social Media</h2>
        <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-1">
          <FormFieldHolder label="Facebook">
            <FormInput
              id="facebook"
              defaultValue={facebook}
              placeholder="Enter profile link"
              {...register("facebook")}
              disabled={isPending}
            />
          </FormFieldHolder>
          <FormFieldHolder label="LinkedIn">
            <FormInput
              id="linkedin"
              defaultValue={linkedIn}
              placeholder="Enter profile link"
              {...register("linkedIn")}
              disabled={isPending}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Instagram">
            <FormInput
              disabled={isPending}
              id="instagram"
              defaultValue={instagram}
              placeholder="Enter profile link"
              {...register("instagram")}
            />
          </FormFieldHolder>
          <FormFieldHolder label="X / Twitter">
            <FormInput
              disabled={isPending}
              id="x"
              defaultValue={twitter}
              placeholder="Enter profile link"
              {...register("twitter")}
            />
          </FormFieldHolder>
        </div>
        <h2 className="mt-20 mb-5 heading-2">Professional Details</h2>
        <div className="grid grid-cols-3 gap-10 mb-20 midmobile:grid-cols-1">
          <FormFieldHolder label="License Number">
            <FormInput
              id="license"
              defaultValue={license}
              placeholder="LC-5758-2048-3944"
              {...register("license")}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Experience">
            <FormInput
              id="experience"
              type="number"
              placeholder="5 yrs"
              defaultValue={experience}
              {...register("experience")}
              disabled={isPending}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Properties Managed">
            <FormInput
              id="x"
              type="number"
              placeholder="Enter properties managed"
              defaultValue={properties}
              {...register("properties")}
              disabled
            />
          </FormFieldHolder>
          <FormFieldHolder label="Specialization">
            <select
              id="specialization"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
              defaultValue={specialization}
              {...register("specialization")}
            >
              <option value="" disabled>
                Area of specialty
              </option>
              <option value="any">Any Area of Specialty</option>
              <option value="rentals">Rentals</option>
              <option value="agriculture">Agriculture</option>
              <option value="luxury">Luxury</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
              <option value="industrial">Industrial</option>
              <option value="investment">Investment</option>
              <option value="land">Land and Plot Sales</option>
            </select>
          </FormFieldHolder>
          <FormFieldHolder label="Agency Name">
            <FormInput
              id="agency-name"
              placeholder="Enter company name"
              defaultValue={agency}
              {...register("agency")}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Region">
            <FormInput
              id="region"
              placeholder="E.g: Agor, Victoria Island, Ajah"
              defaultValue={region}
              {...register("region")}
            />
          </FormFieldHolder>
          <div className="col-span-2 midmobile:col-span-1">
            <FormFieldHolder label="Agency Address">
              <FormInput
                id="agency-address"
                placeholder="Enter company address"
                defaultValue={agencyAddress}
                {...register("agencyAddress")}
              />
            </FormFieldHolder>
          </div>
          <FormFieldHolder label="Availability Status">
            <select
              id="availability-status"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
              defaultValue={availabilityStatus}
              {...register("availabilityStatus")}
            >
              <option value="" disabled>
                Choose availability status
              </option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="busy">Busy</option>
              <option value="temporarily-unavailable">
                Temporarily Unavailable
              </option>
            </select>
          </FormFieldHolder>
          <FormFieldHolder label="Main contact means">
            <select
              id="contact-means"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
              defaultValue={contactMeans}
              {...register("contactMeans")}
            >
              <option value="" disabled>
                Most available contact means
              </option>
              <option value="email">Email</option>
              <option value="whatsapp">Whatsapp</option>
              <option value="facebook">Facebook</option>
              <option value="call">Telephone</option>
              <option value="any">Any</option>
            </select>
          </FormFieldHolder>
          <FormFieldHolder label="Certification">
            <FormInput
              id="certification"
              placeholder="Enter your qualification"
              defaultValue={qualifications.certification}
              {...register("certification")}
            />
          </FormFieldHolder>
          <FormFieldHolder label="Education">
            <FormInput
              id="education"
              placeholder="Enter educational qualification"
              defaultValue={qualifications.education}
              {...register("education")}
            />
          </FormFieldHolder>
        </div>
        <Button>
          {isUpdating ? (
            <LoaderSm />
          ) : (
            <>
              <span>Update Profile</span>
              <HiOutlinePaperAirplane size={24} className="rotate-90" />
            </>
          )}
        </Button>
      </Form>
    </>
  );
}
