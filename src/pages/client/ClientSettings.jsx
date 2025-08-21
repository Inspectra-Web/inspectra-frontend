import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useAuth";
import { useReadProfile, useUpdateProfile } from "../../hooks/useProfile";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import GoBackBtn from "../../components/GoBackBtn";
import IntroHeading from "../../components/IntroHeading";
import Button from "../../components/Button";
import { IoImagesOutline } from "react-icons/io5";
import { handleFileChange } from "../../helpers/FileReader";
import { defaultAvatar } from "../../helpers/helpers";
import { FormInput } from "../realtor/FormInput";
import { FormFieldHolder } from "../realtor/FormFieldHolder";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import Form from "../../components/Form";

export default function ClientSettings() {
  const { profileId, userId } = useParams();
  const { user } = useUser();
  const { isPending, profile } = useReadProfile(profileId || user?.profile);
  const { isPending: isUpdating, updateData } = useUpdateProfile();
  const { register, handleSubmit } = useForm();
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
    gender,
    avatar,
    role,
    telephone,
  } = profile;

  return (
    <>
      {isPending && <LoaderMd />}
      <GoBackBtn />
      <IntroHeading label="User Settings" />
      <Form onSubmit={handleSubmit(onSubmit)} width="max-w-full">
        <h2 className="mb-5 heading-2">Upload Photo</h2>
        <div className="mb-20 flex gap-2 midmobile:flex-col">
          <div className="border-2 border-dashed border-slate-400 min-h-96 w-1/2 midtablet:w-full rounded-2xl flex flex-col items-center justify-center text-center p-5">
            <Button variation="label" labelFor="upload">
              <IoImagesOutline size={24} />
              <span>Select Photo</span>
            </Button>
            <h3 className="heading-2 mt-8">Upload your photo</h3>
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

          <FormFieldHolder label="Email Address">
            <FormInput
              type="email"
              id="email"
              placeholder="example@gmail.com"
              defaultValue={email}
              disabled={true}
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
          <FormFieldHolder label="Telephone">
            <FormInput
              type="number"
              id="telephone"
              defaultValue={telephone}
              placeholder="Enter phone number"
              {...register("telephone")}
            />
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
        <br />
        <br />
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
