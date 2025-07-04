import { useGetClientChatRoom } from "../../hooks/useChat";
import ChatInterface from "../../ui/chat/ChatInterface";
import { LoaderLg } from "../../static/Loaders";
import nodataImg from "../../assets/no-data-found.svg";

export default function ClientChatPage() {
  const { isPending, clientChatRoom, isError } = useGetClientChatRoom();

  return (
    <>
      {isPending && <LoaderLg />}
      <div className="text-center flex flex-col items-center">
        {isError || clientChatRoom?.chatRooms?.length === 0 ? (
          <div className="text-center flex flex-col items-center">
            <img src={nodataImg} className="w-96" />
            <h2 className="heading-2 my-5 capitalize">No Chat Room exists</h2>
            <p className="text-slate-500">
              There are no current chats initiated yet!
            </p>
          </div>
        ) : (
          <ChatInterface apiData={clientChatRoom} currentUserRole="GuestUser" />
        )}
      </div>
    </>
  );
}
