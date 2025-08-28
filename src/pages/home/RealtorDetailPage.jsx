import IntroHeading from "../../components/IntroHeading";
import { HiFingerPrint } from "react-icons/hi";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import ListDetails from "../../components/ListDetails";
import { Link, useLocation, useParams } from "react-router-dom";
import { useReadProfile } from "../../hooks/useProfile";
import { LoaderMd } from "../../static/Loaders";
import { TbFingerprintOff } from "react-icons/tb";
import { defaultAvatar } from "../../helpers/helpers";
import GoBackBtn from "../../components/GoBackBtn";
import { CardContainer } from "../../components/CardContainer";
import { useGetRealtorListingsMain } from "../../hooks/useProperty";
import { NoMessage } from "../../components/NoDataMsg";
import { BsHouseDoor, BsHouses } from "react-icons/bs";
import { useUser } from "../../hooks/useAuth";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function RealtorDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useUser();
  const { id } = useParams();
  const { isPending, profile, error } = useReadProfile(id);
  const {
    isError,
    isLoading,
    properties,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    totalProperties,
  } = useGetRealtorListingsMain(profile?.user._id);

  if (isPending) return <LoaderMd />;

  if (error) return <NoMessage option={false} model="Realtor Profile" />;

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
    state,
    country,
    // telephone,
    bio,
    whatsapp,
    socialLinks: { facebook, twitter, linkedIn, instagram },
    language,
    avatar,
    role,
    region,
    // agency,
    // consultationCost,
    specialization,
  } = profile;
  return (
    <main className="p-10 smtablet:p-0">
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
            {isAuthenticated && (
              <p className="text-slate-500 text-2xl">{email}</p>
            )}
            <p className="text-sm uppercase mt-2 text-slate-400 italic">
              {role || ""}
            </p>
            {/* <p className="text-sky-500">
              {consultationCost > 0 ? (
                <span>
                  Charges <strong>₦{consultationCost.toLocaleString()}</strong>{" "}
                  for consultation
                </span>
              ) : (
                <strong>FREE CONSULTATION</strong>
              )}
            </p> */}
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
                      {totalProperties || 0}
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
        <h2 className="mt-20 mb-5 heading-2">Social Media</h2>
        {isAuthenticated ? (
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
          </div>
        ) : (
          <span className="inline-block p-5 bg-yellow-50 text-yellow-700 rounded-xl">
            Login to view Realtor&apos;s Contact & Social Media Information
          </span>
        )}
        <h2 className="mt-20 mb-5 heading-2">Self Description</h2>
        <p className="mb-5 leading-10 text-slate-500">
          {bio || "Add a description about your work here"}
        </p>
        <h2 className="mt-20 mb-5 heading-2">Additional Details</h2>
        {isAuthenticated ? (
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
              details={
                <p className="uppercase">{gender || "Male or Female"}</p>
              }
            />
            <ListDetails
              title="City of Operation"
              details={<p className="uppercase">{region || "Add city"}</p>}
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
        ) : (
          <span className="inline-block p-5 bg-yellow-50 text-yellow-700 rounded-xl">
            Login to View Realtor&apos;s Additional Details & Information
          </span>
        )}
        <h2 className="mt-20 mb-5 heading-2">
          My Listings ({totalProperties || 0})
        </h2>
        {totalProperties === 0 && <NoMessage model="Listings" option={false} />}
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
              properties
                // .filter((property) => property?.reviewStatus === "approved")
                .map((property) => (
                  <CardContainer
                    landscape={true}
                    key={property._id}
                    property={property}
                  />
                ))}
            {isAuthenticated ? (
              <>
                {hasNextPage && (
                  <button
                    className="focus:outline-none"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? (
                      <span>Loading more...</span>
                    ) : (
                      <span className="inline-flex px-10 py-3 bg-blue-500 rounded-full text-white">
                        Load more
                      </span>
                    )}
                  </button>
                )}
              </>
            ) : (
              <div className="flex justify-center">
                <Button
                  link="/sign-in"
                  variation="link"
                  onClick={() => {
                    localStorage.setItem(
                      "redirectAfterLogin",
                      location.pathname
                    );
                    navigate("/sign-in", {
                      state: { from: location },
                      replace: true,
                    });
                  }}
                >
                  <HiOutlinePaperAirplane size={24} />
                  Login to view more
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
