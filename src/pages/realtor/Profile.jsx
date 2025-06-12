import { MdOutlineMyLocation } from "react-icons/md";
import IntroHeading from "../../components/IntroHeading";
import {
  HiFingerPrint,
  HiOutlinePhoneOutgoing,
  HiOutlineTrash,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocumentTextOutline, IoMailOpenOutline } from "react-icons/io5";
import Button from "../../components/Button";
import { CiEdit } from "react-icons/ci";
import ListDetails from "../../components/ListDetails";
import { Link, useParams } from "react-router-dom";
import {
  useManageVerificationDoc,
  useReadProfile,
} from "../../hooks/useProfile";
import {
  useActivateAccount,
  useDeactivateAccount,
  useLogout,
  useUser,
} from "../../hooks/useAuth";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import { TbFingerprintOff } from "react-icons/tb";
import {
  defaultAvatar,
  formatNigerianPhoneNumber,
} from "../../helpers/helpers";
import GoBackBtn from "../../components/GoBackBtn";
import moment from "moment";
import { HiMiniXMark } from "react-icons/hi2";
import RejectReason from "../../components/RejectReason";
import { useState } from "react";
import { GiRadioactive } from "react-icons/gi";
import { HandleConfirmation } from "../../ui/ConfirmationPrompt";

export default function Profile() {
  const { id } = useParams();
  const { user } = useUser();
  const { isPending, profile } = useReadProfile(id || user?.profile);
  const { manageDoc, isPending: isLoading } = useManageVerificationDoc();
  const { deactivate, isDeactivating } = useDeactivateAccount();
  const { activate, isActivating } = useActivateAccount();
  const { logout } = useLogout();
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");

  if (!profile) return <LoaderMd />;

  const {
    _id,
    user: userId,
    firstname,
    middlename,
    lastname,
    email,
    specialization,
    availabilityStatus,
    contactMeans,
    verified,
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
    agency,
    agencyAddress,
    region,
    qualifications,
    language,
    avatar,
    verificationImages,
    role,
    deactivated,
    consultationCost,
    // referralCode = "Franklin12345",
  } = profile;

  return (
    <>
      {isPending && <LoaderMd />}
      <GoBackBtn />
      <IntroHeading label="Profile Overview" />
      <div className="mx-auto bg-white shadow shadow-slate-200 rounded-2xl p-10 midmobile:p-5">
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
            <div className="flex gap-4 text-slate-600 items-center">
              <MdOutlineMyLocation size={24} className="text-blue-500" />
              <address className="not-italic truncate">
                {houseAddress || "Add residential address here"}
              </address>
            </div>
            <div className="flex gap-4 text-slate-600 items-center">
              <HiOutlinePhoneOutgoing size={24} className="text-blue-500" />
              <p>
                {formatNigerianPhoneNumber(telephone) ||
                  "Add your phone number here"}
              </p>
            </div>
            {/* <div className="flex gap-4 text-slate-600 items-center">
              <CiGlobe size={24} className="text-blue-500" />
              <p>
                <strong>Referral Code</strong>:{" "}
                <Link
                  className="hover:text-sky-500 transition-all duration-500 text-slate-300"
                  to={`/sign-up?ref=${referralCode}`}
                >
                  {referralCode || "NIL"}
                </Link>
              </p>
            </div> */}
          </div>

          <div className="flex flex-col gap-5 ml-10 midtablet:ml-0 midtablet:flex-row midtablet:mt-10">
            <Button
              variation="link"
              link={`/app/profile-settings/${_id}/${userId}`}
            >
              <CiEdit size={24} />
              <span>Update</span>
            </Button>
            {!deactivated ? (
              <Button
                onClick={() =>
                  HandleConfirmation(
                    () =>
                      deactivate(
                        { id: _id },
                        {
                          onSuccess: () => {
                            if (user.role !== "admin") logout();
                          },
                        }
                      ),
                    <p>
                      You are about to deactivate{" "}
                      <span className="font-semibold uppercase">
                        {firstname}
                      </span>
                      &apos;s Inspectra account.
                    </p>
                  )
                }
                variation="delete"
              >
                {isDeactivating ? (
                  <LoaderSm />
                ) : (
                  <>
                    <HiOutlineTrash size={24} />
                    <span>Deactivate</span>
                  </>
                )}
              </Button>
            ) : (
              <>
                {user?.role === "admin" && deactivated && (
                  <Button
                    color="from-green-500 to-green-700 ring-green-300"
                    onClick={() => activate({ id: _id })}
                  >
                    {isActivating ? (
                      <LoaderSm />
                    ) : (
                      <>
                        <GiRadioactive size={24} />
                        <span>Activate</span>
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
        <h2 className="mt-20 mb-5 heading-2">Social Media</h2>
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
          {user.email ? (
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
        <h2 className="mt-20 mb-5 heading-2">Self Description</h2>
        <p className="mb-5 leading-10 text-slate-500 text-[1.7rem]">
          {bio || "Add a description about your work here"}
        </p>
        <h2 className="mt-20 mb-5 heading-2">Professional Details</h2>
        <ul className="list mb-16">
          {/* <ListDetails title="Gender" details="Male" />
          <ListDetails title="D.O.B" details="12th January 1990" /> */}
          <ListDetails
            title="License Number"
            details={license || "Add your license number"}
          />
          <ListDetails
            title="Experience"
            details={
              !experience ? (
                "Add your years of experience"
              ) : (
                <p className="lowercase">{experience + " years (s)"}</p>
              )
            }
          />
          <ListDetails
            title="Specialization"
            details={
              <p className="capitalize">
                {specialization || "Add your area of speciality"}
              </p>
            }
          />
          <ListDetails
            title="Agency"
            details={agency || "Add your company name"}
          />
          <ListDetails
            title="Agency Address"
            details={agencyAddress || "Add your company address"}
          />
          <ListDetails
            title="Region"
            details={region || "Add your region of operation"}
          />
          <ListDetails
            title="Property Listed"
            details={
              user?.property.length || "Add number of properties managed"
            }
          />
        </ul>
        <h2 className="mt-20 mb-5 heading-2">
          Qualifications & Certifications
        </h2>
        <ul className="list mb-16">
          {/* <ListDetails title="Gender" details="Male" />
          <ListDetails title="D.O.B" details="12th January 1990" /> */}
          <ListDetails
            title="Certification"
            details={qualifications?.certification || "NIL"}
          />
          <ListDetails
            title="Edu. Background"
            details={qualifications?.education || "NIL"}
          />
        </ul>
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
            title="City"
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
        </ul>
        <h2 className="mt-20 mb-5 heading-2">Verification Details</h2>
        <ul className="list mb-16">
          {!verificationImages.length ? (
            <p className="italic text-slate-500">
              No Verification Document Uploaded
            </p>
          ) : (
            verificationImages?.map((data) => (
              <ListDetails
                key={data._id}
                title={
                  <span className="capitalize">
                    {data.type.replace(/-/g, " ")}
                  </span>
                }
                details={<p className="uppercase">{data.status}</p>}
              />
            ))
          )}
        </ul>
        <div className="grid gap-5">
          {verificationImages?.map((data) => (
            <div
              key={data._id}
              className="text-[1.5rem] flex items-center justify-between gap-5 bg-white text-slate-500 p-5 rounded-2xl border-l-4 border-blue-200 border"
            >
              <div className="flex gap-5">
                {data.url.endsWith(".pdf") ? (
                  <IoDocumentTextOutline
                    className={`text-[7rem] ${
                      data.type === "government-issued-id"
                        ? "text-blue-500"
                        : data.type === "license"
                        ? "text-green-500"
                        : data.type === "qualification"
                        ? "text-indigo-500"
                        : "text-rose-500"
                    }`}
                  />
                ) : (
                  <img
                    src={data.url}
                    alt={`Preview of ${data.type.replace(/-/g, " ")}`}
                    className="w-24 h-24 rounded-full"
                  />
                )}

                <div>
                  <Link
                    target="_blank"
                    to={data.url}
                    className={`font-semibold capitalize ${
                      data.type === "government-issued-id"
                        ? "text-blue-500"
                        : data.type === "license"
                        ? "text-green-500"
                        : data.type === "qualification"
                        ? "text-indigo-500"
                        : "text-rose-500"
                    }  text-bt`}
                  >
                    {data.type?.replace(/-/g, " ")}
                  </Link>
                  <p>
                    Docs Attachment sent for review is{" "}
                    <span
                      className={`inline-block ${
                        data.status === "pending"
                          ? "text-blue-500 bg-blue-50"
                          : data.status === "verified"
                          ? "text-green-500 bg-green-50"
                          : "text-rose-500 bg-rose-50"
                      }  font-semibold -skew-x-6 px-2 py-1 rounded-xl`}
                    >
                      {data.status}
                    </span>{" "}
                    for verification.
                  </p>{" "}
                  <div className="text-[1.2rem] italic capitalize flex gap-6">
                    <span>{moment(data.uploadedAt).fromNow()}</span>
                    {user.role === "admin" && data.status === "pending" && (
                      <>
                        {isLoading ? (
                          "processing..."
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                HandleConfirmation(
                                  () =>
                                    manageDoc({
                                      id: data._id,
                                      data: { status: "verified" },
                                    }),
                                  <p>
                                    You are about to verify{" "}
                                    <span className="font-semibold uppercase">
                                      {firstname}
                                    </span>
                                    &apos;s {data.type.replace("-", " ")}. Do
                                    you want to proceed?
                                  </p>
                                )
                              }
                              className="flex items-center gap-2 text-green-700 hover:text-green-500"
                            >
                              <HiFingerPrint /> Verify
                            </button>
                            <button
                              onClick={() =>
                                HandleConfirmation(
                                  () => setShow(!show),
                                  <p>
                                    You are about to reject{" "}
                                    <span className="font-semibold uppercase">
                                      {firstname}
                                    </span>
                                    &apos;s {data.type.replace("-", " ")}. Do
                                    you want to proceed?
                                  </p>
                                )
                              }
                              className="flex items-center gap-2 text-rose-700 hover:text-rose-500"
                            >
                              <HiMiniXMark /> Reject
                            </button>
                            {show && (
                              <RejectReason
                                reason={reason}
                                onSetReason={setReason}
                                onSetShow={setShow}
                                onManageDoc={() =>
                                  manageDoc({
                                    id: data._id,
                                    data: {
                                      status: "rejected",
                                      rejectionReason: reason,
                                    },
                                  })
                                }
                                isLoading={isLoading}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xl px-2 py-1 text-center bg-slate-100 rounded-xl font-semibold">
                {moment(data.uploadedAt).format("ll")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
