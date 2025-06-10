import { HiOutlinePaperAirplane } from "react-icons/hi";
import Form from "../../components/Form";
import IntroHeading from "../../components/IntroHeading";
import Button from "../../components/Button";
import { ImageUpload } from "../realtor/ImageUpload";
import { handleFileChange } from "../../helpers/FileReader";
import { useState } from "react";
import { SelectedUpload } from "../realtor/SelectedUpload";
import { FormFieldHolder } from "../realtor/FormFieldHolder";
import { FormInput } from "../realtor/FormInput";
import { IoImagesOutline } from "react-icons/io5";
import { defaultAvatar } from "../../helpers/helpers";

export default function AddRealtor() {
  const [selectedID, setSelectedID] = useState(null);
  const [selectedID1, setSelectedID1] = useState(null);
  const [selectedID2, setSelectedID2] = useState(null);
  const [selectedID3, setSelectedID3] = useState(null);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <IntroHeading label="Add Realtor" />
      <Form width="max-w-full">
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
              src={defaultAvatar("male")}
              alt={`Photo of a realtor`}
              className="h-[28rem] w-[28rem] object-cover rounded-full"
              loading="lazy"
            />
          </div>
        </div>
        <h2 className="mb-5 heading-2">Realtor&apos;s Summary</h2>
        <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-1">
          <FormFieldHolder label="First Name">
            <FormInput id="first-name" placeholder="Franklin" />
          </FormFieldHolder>
          <FormFieldHolder label="Last Name">
            <FormInput id="last-name" placeholder="Diri" />
          </FormFieldHolder>
          <FormFieldHolder label="Middle Name">
            <FormInput id="middle-name" placeholder="Osas" />
          </FormFieldHolder>
          <div className="col-span-3 midmobile:col-span-1">
            <FormFieldHolder label="Self Description">
              <textarea
                id="description"
                className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-3xl h-40 px-10 py-5 placeholder:text-slate-500 text-slate-500 resize-none"
                placeholder="Let's know you more"
              ></textarea>
            </FormFieldHolder>
          </div>
          <FormFieldHolder label="Email Address">
            <FormInput
              type="email"
              id="email"
              placeholder="example@gmail.com"
            />
          </FormFieldHolder>
          <FormFieldHolder label="Gender">
            <select
              id="gender"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </FormFieldHolder>
          <FormFieldHolder label="Language">
            <FormInput id="languages" placeholder="e.g: English, Igbo, Hausa" />
          </FormFieldHolder>
          <div className="col-span-2 midmobile:col-span-1">
            <FormFieldHolder label="House Address">
              <FormInput
                type="address"
                id="address"
                placeholder="Enter your address"
              />
            </FormFieldHolder>
          </div>
          <FormFieldHolder label="City">
            <FormInput id="city" placeholder="Enter city name" />
          </FormFieldHolder>

          <FormFieldHolder label="State / Province">
            <FormInput id="state" placeholder="Enter state name" />
          </FormFieldHolder>

          <FormFieldHolder label="Country">
            <FormInput id="country" placeholder="Enter country name" />
          </FormFieldHolder>
          <FormFieldHolder label="Telephone">
            <FormInput id="telephone" placeholder="Enter phone number" />
          </FormFieldHolder>
          <FormFieldHolder label="Whatsapp">
            <FormInput id="whatsapp" placeholder="Enter whatsapp contact" />
          </FormFieldHolder>
          <FormFieldHolder label="Website">
            <FormInput id="website" placeholder="https://domain.com" />
          </FormFieldHolder>
          <FormFieldHolder label="Password">
            <FormInput
              id="password"
              placeholder="Enter password"
              type="password"
            />
          </FormFieldHolder>
          <FormFieldHolder label="Confirm Password">
            <FormInput
              id="confirm-password"
              type="password"
              placeholder="Retype password"
            />
          </FormFieldHolder>
        </div>
        <h2 className="mt-20 mb-5 heading-2">Social Media</h2>
        <div className="grid grid-cols-3 gap-10 midmobile:grid-cols-1">
          <FormFieldHolder label="Facebook">
            <FormInput id="facebook" placeholder="Enter profile link" />
          </FormFieldHolder>
          <FormFieldHolder label="LinkedIn">
            <FormInput id="linkedin" placeholder="Enter profile link" />
          </FormFieldHolder>
          <FormFieldHolder label="Instagram">
            <FormInput id="instagram" placeholder="Enter profile link" />
          </FormFieldHolder>
          <FormFieldHolder label="X / Twitter">
            <FormInput id="x" placeholder="Enter profile link" />
          </FormFieldHolder>
        </div>
        <h2 className="mt-20 mb-5 heading-2">Professional Details</h2>
        <div className="grid grid-cols-3 gap-10 mb-20 midmobile:grid-cols-1">
          <FormFieldHolder label="License Number">
            <FormInput id="license" placeholder="LC-5758-2048-3944" />
          </FormFieldHolder>
          <FormFieldHolder label="Experience">
            <FormInput id="experience" type="number" placeholder="5 yrs" />
          </FormFieldHolder>
          <FormFieldHolder label="Properties Managed">
            <FormInput id="x" type="number" placeholder="Enter profile link" />
          </FormFieldHolder>
          <FormFieldHolder label="Specialization">
            <select
              id="specialization"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
            >
              <option value="" disabled>
                Area of specialty
              </option>
              <option value="rentals">Rentals</option>
              <option value="agriculture">Agriculture</option>
              <option value="luxury">Luxury</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
              <option value="other">Other</option>
            </select>
          </FormFieldHolder>
          <FormFieldHolder label="Agency Name">
            <FormInput id="agency-name" placeholder="Enter company name" />
          </FormFieldHolder>
          <FormFieldHolder label="Region">
            <FormInput
              id="region"
              placeholder="E.g: Agor, Victoria Island, Ajah"
            />
          </FormFieldHolder>
          <div className="col-span-2 midmobile:col-span-1">
            <FormFieldHolder label="Agency Address">
              <FormInput
                id="agency-address"
                placeholder="Enter company address"
              />
            </FormFieldHolder>
          </div>
          <FormFieldHolder label="Availability Status">
            <select
              id="specialization"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
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
              <option value="new-clients">Accepting New Clients</option>
            </select>
          </FormFieldHolder>
          <FormFieldHolder label="Main contact means">
            <select
              id="contact-means"
              className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 text-slate-500"
            >
              <option value="" disabled>
                Most available contact means
              </option>
              <option value="email">Email</option>
              <option value="whatsapp">Whatsapp</option>
              <option value="facebook">Facebook</option>
              <option value="call">Telephone</option>
              <option value="call">Any</option>
              <option value="other">Other</option>
            </select>
          </FormFieldHolder>
        </div>
        <ImageUpload
          labelId="upload-id"
          btnLabel="Upload ID"
          uploadLabel="Upload One Government-Issued ID"
          boldDescription="National ID Card // Driver's License // International Passport // Voter's Card (Should be valid and not expired)"
          smallDescription="Accepted formats: PDF, JPG, PNG, WebP | 5MB max size recommended."
          onHandleUpload={(e) => handleFileChange(e, setSelectedID, setError)}
        />
        {error && (
          <p className="text-rose-500 text-sm text-center my-10 font-medium">
            {error}
          </p>
        )}

        {selectedID && (
          <>
            <SelectedUpload
              name={selectedID.name}
              src={selectedID.src}
              setSelectedID={setSelectedID}
              size={selectedID.size}
              type={selectedID.type}
            />
          </>
        )}
        <ImageUpload
          labelId="upload-certificate"
          btnLabel="Upload Certificate"
          uploadLabel="Confirm your qualifications in real estate."
          boldDescription="Real Estate Training Certificate // Realtor Accreditation Certification // Professional Membership Certificate (e.g., NIESV in Nigeria)"
          smallDescription="Must show your name and date of issuance. Accepted formats: JPG, PNG, WebP | 5MB max size recommended."
          onHandleUpload={(e) => handleFileChange(e, setSelectedID1, setError1)}
        />
        {error1 && (
          <p className="text-rose-500 text-sm text-center my-10 font-medium">
            {error1}
          </p>
        )}

        {selectedID1 && (
          <>
            <SelectedUpload
              name={selectedID1.name}
              src={selectedID1.src}
              setSelectedID={setSelectedID1}
              size={selectedID1.size}
              type={selectedID1.type}
            />
          </>
        )}
        <ImageUpload
          labelId="upload-license"
          btnLabel="Upload License"
          uploadLabel="Agency/Agent License"
          boldDescription="Real Estate Agent License // Agency License"
          smallDescription="Must include license number and expiry date. Accepted formats: PDF, JPG, PNG, WebP | 5MB max size recommended. "
          onHandleUpload={(e) => handleFileChange(e, setSelectedID2, setError2)}
        />
        {error2 && (
          <p className="text-rose-500 text-sm text-center my-10 font-medium">
            {error2}
          </p>
        )}

        {selectedID2 && (
          <>
            <SelectedUpload
              name={selectedID2.name}
              src={selectedID2.src}
              setSelectedID={setSelectedID2}
              size={selectedID2.size}
              type={selectedID2.type}
            />
          </>
        )}
        <ImageUpload
          labelId="upload-bill"
          btnLabel="Upload Bill"
          uploadLabel="Utility Bill for Address Verification"
          boldDescription="Electricity Bill // Water Bill // Waste Management Bill"
          smallDescription="Should be recent (within the last 3 months). Accepted formats: PDF, JPG, PNG, WebP | 5MB max size recommended."
          onHandleUpload={(e) => handleFileChange(e, setSelectedID3, setError3)}
        />
        {error3 && (
          <p className="text-rose-500 text-sm text-center my-10 font-medium">
            {error3}
          </p>
        )}

        {selectedID3 && (
          <>
            <SelectedUpload
              name={selectedID3.name}
              src={selectedID3.src}
              setSelectedID={setSelectedID3}
              size={selectedID3.size}
              type={selectedID3.type}
            />
          </>
        )}

        <div className="mt-20">
          <Button>
            <span>Create Realtor Account</span>
            <HiOutlinePaperAirplane size={24} className="rotate-90" />
          </Button>
        </div>
      </Form>
    </>
  );
}
