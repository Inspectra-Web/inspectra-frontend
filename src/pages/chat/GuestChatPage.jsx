import { useParams } from "react-router-dom";
import Logo from "../../components/Logo";
import { useGetGuestChatRoom } from "../../hooks/useChat";
import ChatInterface from "../../ui/chat/ChatInterface";
import { LoaderLg } from "../../static/Loaders";
import nodataImg from "../../assets/no-data-found.svg";

export default function GuestChatPage() {
  const { token } = useParams();
  const { isPending, guestChatRoom, isError } = useGetGuestChatRoom(token);

  return (
    <>
      {isPending && <LoaderLg />}
      <div className="bg-slate-50 h-screen px-40 smtablet:px-10 flex flex-col items-center gap-10 justify-center">
        <Logo />
        {isError || guestChatRoom?.chatRooms?.length === 0 ? (
          <div className="text-center my-20 flex flex-col items-center">
            <img src={nodataImg} className="w-96" />
            <h2 className="heading-2 my-5 capitalize">No Chat Room exists</h2>
            <p className="text-slate-500">
              There are no current chats initiated yet!
            </p>
          </div>
        ) : (
          <ChatInterface apiData={guestChatRoom} currentUserRole="GuestUser" />
        )}
      </div>
    </>
  );
}
