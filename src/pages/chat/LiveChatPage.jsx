import { Link } from "react-router-dom";
import nodataImg from "../../assets/no-data-found.svg";
import { useGetRealtorChatRoom } from "../../hooks/useChat";
import { LoaderMd } from "../../static/Loaders";
import ChatInterface from "../../ui/chat/ChatInterface";
import Button from "../../components/Button";
import { useUser } from "../../hooks/useAuth";

export default function LiveChatPage() {
  const { isPending, realtorChatRoom } = useGetRealtorChatRoom();
  const { user } = useUser();

  console.log(realtorChatRoom);
  return (
    <>
      {isPending ? (
        <LoaderMd />
      ) : !(
          user.planActivatedAt &&
          user.planExpiresAt &&
          new Date(user.planExpiresAt) > new Date()
        ) && user.role !== "admin" ? (
        <div className="text-center my-20 flex flex-col items-center">
          <img src={nodataImg} className="w-96" />
          <h2 className="heading-2 my-5 capitalize">Subscription Required</h2>
          <p className="text-slate-500 mb-10">
            You need an active subscription for{" "}
            <strong>
              <em>Live Chats</em>
            </strong>
            .
          </p>
          <Link to="/pricings">
            <Button>View Plans & Subscribe</Button>
          </Link>
        </div>
      ) : realtorChatRoom.chatRooms.length === 0 ? (
        <div className="text-center my-20 flex flex-col items-center">
          <img src={nodataImg} className="w-96" />
          <h2 className="heading-2 my-5 capitalize">No Chat Room exists</h2>
          <p className="text-slate-500">
            There are no current chats initiated yet!
          </p>
        </div>
      ) : (
        <ChatInterface apiData={realtorChatRoom} currentUserRole="User" />
      )}
    </>
  );
}
