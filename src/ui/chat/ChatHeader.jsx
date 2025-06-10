import { IoChatbubbles, IoChatbubblesOutline } from "react-icons/io5";
import { useReadProfile } from "../../hooks/useProfile";
import { defaultAvatar } from "../../helpers/helpers";

export default function ChatHeader({
  selectedChatRoom,
  onOpen,
  isOpen,
  onlineUsers,
}) {
  const realtorProfileId = selectedChatRoom?.realtor.profile;
  const { isPending, profile } = useReadProfile(
    realtorProfileId ? realtorProfileId : null
  );

  const targetUserId =
    typeof selectedChatRoom?.realtor === "object"
      ? selectedChatRoom?.realtor?._id
      : selectedChatRoom?.client?._id;

  const isOnline = onlineUsers?.includes(targetUserId);

  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-12 py-6">
      <div className="flex items-center gap-6">
        <div className="relative h-24 w-24">
          <img
            src={isPending ? defaultAvatar(profile?.gender) : profile?.avatar}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-blue-500 ring-2 ring-white"></span>
        </div>
        <div>
          <div className="smmobile:w-5/6">
            <h2 className="text-4xl font-semibold  smmobile:text-3xl smmobile:truncate">
              {typeof selectedChatRoom?.realtor === "string"
                ? null
                : selectedChatRoom?.realtor.fullname}
              {typeof selectedChatRoom?.client === "string"
                ? null
                : selectedChatRoom?.client.name}
            </h2>
          </div>

          <div className="flex items-center gap-3 smmobile:flex-col smmobile:gap-0 smmobile:items-start">
            <span className="text-2xl text-gray-600 uppercase">
              {typeof selectedChatRoom?.realtor === "string"
                ? null
                : selectedChatRoom?.realtor.role}
              {typeof selectedChatRoom?.client === "string" ? null : (
                <span className="lowercase">
                  {selectedChatRoom?.client.email}
                </span>
              )}
            </span>

            <span className="text-2xl text-gray-600 uppercase">
              <span
                className={`h-4 w-4 inline-block rounded-full ${
                  isOnline ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>{" "}
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <button className="hidden bigmobile:block">
        {isOpen ? (
          <IoChatbubbles
            size={24}
            className="text-slate-300 cursor-pointer"
            onClick={onOpen}
          />
        ) : (
          <IoChatbubblesOutline
            size={24}
            className="text-slate-300 cursor-pointer"
            onClick={onOpen}
          />
        )}
      </button>
    </header>
  );
}
