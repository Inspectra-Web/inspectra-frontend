import { Link, useParams } from "react-router-dom";
import PropertyStatusBox from "../../components/PropertyStatusBox";
import { IoChatbubblesOutline, IoSettingsOutline } from "react-icons/io5";
import {
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { useActivateAccount, useUser } from "../../hooks/useAuth";
import { useReadProfile } from "../../hooks/useProfile";
import { LoaderMd, LoaderSm } from "../../static/Loaders";
import Button from "../../components/Button";
import { CiEdit } from "react-icons/ci";
// import { HandleConfirmation } from "../../ui/ConfirmationPrompt";
import {
  defaultAvatar,
  formatNigerianPhoneNumber,
} from "../../helpers/helpers";
import { GiRadioactive } from "react-icons/gi";
import { GoMail } from "react-icons/go";

export default function ClientOverview() {
  const { id } = useParams();
  const { user } = useUser();
  const { isPending, profile } = useReadProfile(id || user?.profile);
  //   const { deactivate, isDeactivating } = useDeactivateAccount();
  const { activate, isActivating } = useActivateAccount();
  //   const { logout } = useLogout();

  if (!profile) return <LoaderMd />;

  const {
    _id,
    firstname,
    middlename,
    lastname,
    email,
    gender,
    avatar,
    role,
    deactivated,
    telephone,
  } = profile;

  return (
    <div>
      {isPending && <LoaderMd />}
      <div className="bg-white mx-auto shadow shadow-slate-200 rounded-2xl p-10 midmobile:p-5">
        <div className="flex justify-center items-center gap-10 flex-wrap smmobile:justify-center">
          <div className="relative">
            <img
              src={avatar || defaultAvatar(gender)}
              alt="Profile photo"
              className="w-60 h-60 rounded-full ring-4 ring-white shadow-md shadow-black"
              loading="lazy"
            />
          </div>

          <div className="xsm:text-center">
            <h4 className="text-3xl font-semibold capitalize">
              {firstname} {middlename[0]}. {lastname}
              {/* Franklin C. Okoro */}
            </h4>
            <p className="text-slate-500 text-2xl">{email}</p>
            <p className="text-3xl uppercase my-2 text-blue-500 font-medium italic">
              {role || ""}
            </p>
            <p>{formatNigerianPhoneNumber(telephone)}</p>
          </div>

          <div className="flex flex-wrap gap-5 ml-10 midtablet:ml-0 midtablet:flex-row">
            <Button
              variation="link"
              //   link={`/app/profile-settings/${_id}/${userId}`}
              link="/client/settings"
            >
              <CiEdit size={24} />
              <span>Update</span>
            </Button>
            {!deactivated ? (
              //   <Button
              //     onClick={() =>
              //       HandleConfirmation(
              //         () =>
              //           deactivate(
              //             { id: _id },
              //             {
              //               onSuccess: () => {
              //                 if (user.role !== "admin") logout();
              //               },
              //             }
              //           ),
              //         <p>
              //           You are about to deactivate{" "}
              //           <span className="font-semibold uppercase">
              //             {firstname}
              //           </span>
              //           &apos;s Inspectra account.
              //         </p>
              //       )
              //     }
              //     variation="delete"
              //   >
              //     {isDeactivating ? (
              //       <LoaderSm />
              //     ) : (
              //       <>
              //         <HiOutlineTrash size={24} />
              //         <span>Deactivate</span>
              //       </>
              //     )}
              //   </Button>
              <></>
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
      </div>
      <div className="mt-5 bg-blue-50 text-blue-500 p-5 text-center uppercase font-bold">
        Get your first property today!
      </div>
      <div className="grid grid-cols-4 gap-8 my-8 bigtablet:grid-cols-3 bigmobile:grid-cols-2 smmobile:grid-cols-1">
        <Link to="/listings">
          <PropertyStatusBox
            icon={
              <HiOutlineHome className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
            }
            label="Search Listings"
          />
        </Link>

        <Link to="/top-listings">
          <PropertyStatusBox
            icon={
              <HiOutlineHomeModern className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
            }
            label="Top Listings"
          />
        </Link>
        {/* <Link to="/client/favourites">
          <PropertyStatusBox
            icon={
              <RiHomeHeartLine className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
            }
            label="Saved Properties"
          />
        </Link> */}
        <Link to="/client/live-chat">
          <PropertyStatusBox
            icon={
              <IoChatbubblesOutline className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
            }
            label="View Messages"
          />
        </Link>
        {/* <Link to="/client/reviews">
          <PropertyStatusBox
            icon={
              <LuMessageCircle className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
            }
            label="My Reviews"
          />
        </Link> */}
        <Link to="/client/inquiries">
          <PropertyStatusBox
            icon={
              <GoMail className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
            }
            label="Inquiries"
          />
        </Link>
        <Link to="/client/schedules">
          <PropertyStatusBox
            icon={
              <HiOutlineCalendar className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
            }
            label="Inspections"
          />
        </Link>
        <Link to="/client/settings">
          <PropertyStatusBox
            icon={
              <IoSettingsOutline className="text-[6rem] p-5 bg-gradient-to-tr from-blue-50 to-blue-200 text-blue-500 rounded-xl" />
            }
            label="User Settings"
          />
        </Link>
      </div>
    </div>
  );
}
