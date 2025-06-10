import { useParams } from "react-router-dom";
import Logo from "../../components/Logo";
import { useGetGuestChatRoom } from "../../hooks/useChat";
import ChatInterface from "../../ui/chat/ChatInterface";
import { LoaderLg } from "../../static/Loaders";

export default function GuestChatPage() {
  const { token } = useParams();
  const { isPending, guestChatRoom } = useGetGuestChatRoom(token);

  return (
    <>
      {isPending && <LoaderLg />}
      <div className="bg-slate-50 h-screen px-40 smtablet:px-10 flex flex-col items-center gap-10 justify-center">
        <Logo />
        <ChatInterface apiData={guestChatRoom} currentUserRole="GuestUser" />
      </div>
    </>
  );
}
