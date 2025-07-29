import IntroHeading from "../../components/IntroHeading";
import { HiFingerPrint } from "react-icons/hi";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { IoMailOpenOutline } from "react-icons/io5";
import ListDetails from "../../components/ListDetails";
import { useParams } from "react-router-dom";
import { useReadProfile } from "../../hooks/useProfile";
import { LoaderMd } from "../../static/Loaders";
import { TbFingerprintOff } from "react-icons/tb";
import { defaultAvatar } from "../../helpers/helpers";
import GoBackBtn from "../../components/GoBackBtn";
import { CardContainer } from "../../components/CardContainer";
import { useGetRealtorListingsMain } from "../../hooks/useProperty";
import { NoMessage } from "../../components/NoDataMsg";
import { BsHouseDoor, BsHouses } from "react-icons/bs";

export default function RealtorDetailPage() {
  const { id } = useParams();
  const { isPending, profile } = useReadProfile(id);
  const { isError, isLoading, properties } = useGetRealtorListingsMain(
    profile?.user._id
  );
  if (!profile) return <LoaderMd />;

  const {
    firstname,
    middlename,
    lastname,
    email,
    availabilityStatus,
    contactMeans,
    verified,
    gender,
    city,
    state,
    country,
    // telephone,
    bio,
    // whatsapp,
    // socialLinks: { facebook, twitter, linkedIn, instagram },
    language,
    avatar,
    role,
    // agency,
    consultationCost,
    specialization,
  } = profile;

  return (
    <main className="p-10 smtablet:p-0">
      {isPending && <LoaderMd />}
      <div className="smtablet:pl-10">
        <GoBackBtn />
      </div>
      <div className="text-center">
        <IntroHeading label="Profile Overview" />
      </div>
      <div className="mx-auto max-w-[80rem] bg-white shadow shadow-slate-300 rounded-2xl p-10 midmobile:p-5 midmobile:shadow-slate-50">
        <div className="flex items-center gap-10 mb-10 flex-wrap smmobile:justify-center">
          <div className="relative">
            <img
              src={avatar || defaultAvatar(gender)}
              alt="Profile photo"
              className="w-60 h-60 rounded-full ring-4 ring-white shadow-md shadow-black"
              loading="lazy"
            />
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full absolute bottom-0 left-2/4 -translate-x-1/2 translate-y-1/2 bg-blue-500 ${
                verified ? "bg-blue-500" : "bg-stone-700"
              }`}
            >
              {verified ? (
                <HiFingerPrint className=" text-white text-4xl " />
              ) : (
                <TbFingerprintOff className="text-white text-4xl" />
              )}
              {/* <HiFingerPrint className=" text-white text-4xl " /> */}
            </div>
          </div>

          <div className="xsm:text-center">
            <h4 className="text-3xl font-semibold capitalize">
              {firstname} {middlename[0]}. {lastname}
              {/* Franklin C. Okoro */}
            </h4>
            <p className="text-slate-500 text-2xl">{email}</p>
            <p className="text-sm uppercase mt-2 text-slate-400 italic">
              {role || ""}
            </p>
            <p className="text-sky-500">
              {consultationCost > 0 ? (
                <span>
                  Charges <strong>₦{consultationCost.toLocaleString()}</strong>{" "}
                  for consultation
                </span>
              ) : (
                <strong>FREE CONSULTATION</strong>
              )}
            </p>
          </div>

          <div className="mx-10 flex flex-col gap-5 smtablet:mx-0">
            {/* <div className="flex gap-4 text-slate-600 items-center">
              <HiOutlinePhoneOutgoing size={24} className="text-blue-500" />
              <p>{telephone || "Add your phone number here"}</p>
            </div> */}
            <div className="flex gap-4 text-slate-600 items-center">
              <BsHouses size={24} className="text-blue-500" />
              <p>
                {(
                  <span className="flex items-center gap-2">
                    <strong className="text-[2rem] italic">
                      {profile.user.property?.length}
                    </strong>{" "}
                    Listing(s)
                  </span>
                ) || "Add your phone number here"}
              </p>
            </div>
            <div className="flex gap-4 text-slate-600 items-center">
              <BsHouseDoor size={24} className="text-blue-500" />
              <p>INDIVIDUAL AGENT</p>
            </div>
          </div>
        </div>
        {/* <h2 className="mt-20 mb-5 heading-2">Social Media</h2>
        <div className="flex gap-7">
          {facebook ? (
            <Link to={facebook} target="_blank">
              <FaFacebookF className="p-5 bg-blue-100 text-blue-500 text-7xl rounded-xl transition-all duration-300 hover:bg-blue-500 hover:text-blue-50 cursor-pointer" />
            </Link>
          ) : null}
          {instagram ? (
            <Link to={instagram} target="_blank">
              <FaInstagram className="p-5 bg-red-100 text-red-500 text-7xl rounded-xl transition-all duration-300 hover:bg-red-500 hover:text-red-50 cursor-pointer" />
            </Link>
          ) : null}
          {twitter ? (
            <Link to={twitter} target="_blank">
              <FaXTwitter className="p-5 bg-stone-100 text-stone-500 text-7xl rounded-xl transition-all duration-300 hover:bg-stone-500 hover:text-stone-50 cursor-pointer" />
            </Link>
          ) : null}
          {whatsapp ? (
            <Link
              to={`https://wa.me/${whatsapp}?text=Hello,%20I%20want%20to%20learn%20more%20about%20your%20services.`}
              target="_blank"
            >
              <FaWhatsapp className="p-5 bg-green-100 text-green-500 text-7xl rounded-xl transition-all duration-300 hover:bg-green-500 hover:text-green-50 cursor-pointer" />
            </Link>
          ) : null}
          {email ? (
            <Link
              to={`mailto:${profile.email}?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
              target="_blank"
            >
              <IoMailOpenOutline className="p-5 bg-orange-100 text-orange-500 text-7xl rounded-xl transition-all duration-300 hover:bg-orange-500 hover:text-orange-50 cursor-pointer" />
            </Link>
          ) : null}
          {linkedIn ? (
            <Link target="_blank" to={linkedIn}>
              <FaLinkedinIn className="p-5 bg-sky-100 text-sky-500 text-7xl rounded-xl transition-all duration-300 hover:bg-sky-500 hover:text-sky-50 cursor-pointer" />
            </Link>
          ) : null}
        </div> */}
        <h2 className="mt-20 mb-5 heading-2">Self Description</h2>
        <p className="mb-5 leading-10 text-slate-500">
          {bio || "Add a description about your work here"}
        </p>
        <h2 className="mt-20 mb-5 heading-2">Additional Details</h2>
        <ul className="list mb-16">
          <ListDetails
            title="Languages Spoken"
            details={language || "Add languages you speak"}
          />
          <ListDetails
            title="Availability Status"
            details={
              <p className="uppercase">
                {availabilityStatus || "Add your availability status"}
              </p>
            }
          />
          <ListDetails
            title="Contact Means"
            details={
              <p className="uppercase">
                {contactMeans || "Add main means of contact"}
              </p>
            }
          />
          <ListDetails
            title="Gender"
            details={<p className="uppercase">{gender || "Male or Female"}</p>}
          />
          <ListDetails
            title="City of Operation"
            details={<p className="uppercase">{city || "Add city"}</p>}
          />
          <ListDetails
            title="State"
            details={<p className="uppercase">{state || "Add state"}</p>}
          />
          <ListDetails
            title="Country"
            details={<p className="uppercase">{country || "Add country"}</p>}
          />
          <ListDetails
            title="Area of Specialty"
            details={
              <p className="uppercase">
                {specialization === "any"
                  ? "Any Kind of Property"
                  : specialization || "Add Specialty"}
              </p>
            }
          />
        </ul>
        <h2 className="mt-20 mb-5 heading-2">
          My Listings ({profile.user.property.length || 0})
        </h2>
        {profile.user.property?.length === 0 && (
          <NoMessage model="Listings" option={false} />
        )}
        {isError && (
          <p className="text-rose-500 font-semibold">
            An Error Occured! Please check your internet connection or Try again
            later.
          </p>
        )}
        {isLoading ? (
          <LoaderMd />
        ) : (
          <div className="flex flex-col gap-10">
            {properties &&
              properties.map((property) => (
                <CardContainer
                  landscape={true}
                  key={property._id}
                  property={property}
                />
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
