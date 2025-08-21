import moment from "moment";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { LoaderMd } from "../../static/Loaders";
import { memo, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import socket from "../../utils/socket";
import nodataImg from "../../assets/live-chat.svg";
const MemoizedMessage = memo(({ message, isCurrentUserSender }) => (
  <div
    className={`flex ${isCurrentUserSender ? "justify-end" : "justify-start"}`}
  >
    <div className="flex max-w-[80%] smmobile:w-full flex-col">
      <div
        className={`rounded-t-2xl rounded-l-2xl p-6 bg-gradient-to-tr ${
          !isCurrentUserSender
            ? "from-gray-50 to-slate-50 text-slate-500"
            : " from-sky-400 to-blue-500 text-white"
        } `}
      >
        <p className="text-[1.7rem] text-left">{message.content}</p>
      </div>
      <span
        className={`mt-1 flex items-center gap-3 text-gray-500 text-sm ${
          isCurrentUserSender ? "text-right" : "text-left"
        }`}
      >
        {isCurrentUserSender && message.pending ? (
          <>
            <AiOutlineLoading3Quarters />{" "}
            {moment(message.createdAt).format("DD/MM/YYYY hh.mmA")}
          </>
        ) : isCurrentUserSender && !message.seen ? (
          <>
            <IoCheckmarkDoneOutline />{" "}
            {moment(message.createdAt).format("DD/MM/YYYY hh.mmA")}
          </>
        ) : (
          <>
            {isCurrentUserSender && message.seen && (
              <IoCheckmarkDoneOutline className="text-blue-500" />
            )}{" "}
            {moment(message.createdAt).format("DD/MM/YYYY hh.mmA")}
          </>
        )}
      </span>
    </div>
  </div>
));

MemoizedMessage.displayName = "MemoizedMessage";

export default function ChatMessages({ loading, messages, currentUserRole }) {
  const chatContainerRef = useRef(null);
  const [typingUser, setTypingUser] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!loading) setHasFetched(true);
  }, [loading]);

  useEffect(() => {
    const handleTyping = ({ user }) => {
      if (user?.senderModel !== currentUserRole) setTypingUser(user);
    };

    const handleStopTyping = ({ user }) => {
      if (user?.senderModel !== currentUserRole) setTypingUser(null);
    };

    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
    };
  }, [currentUserRole]);

  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
  }, [messages]);
  return (
    <>
      {loading ? (
        <LoaderMd />
      ) : !hasFetched ? (
        <LoaderMd />
      ) : messages.length === 0 ? (
        <div className="flex-1 h-full overflow-y-auto p-8">
          <div className="text-center mt-10 flex flex-col items-center">
            <img src={nodataImg} className="w-96" />
            <h2 className="heading-2 mt-5 capitalize">Start chatting</h2>
            <p className="text-slate-500">
              {currentUserRole === "User"
                ? "Initiate a chat with your CLIENT"
                : "Send a message to the PROPERTY MANAGER"}
            </p>
          </div>
        </div>
      ) : (
        <div
          ref={chatContainerRef}
          className="flex-1 h-full overflow-y-auto p-8"
        >
          <div className="flex flex-col gap-8">
            {messages?.map((message) => {
              const isCurrentUserSender =
                message.senderModel === currentUserRole;
              return (
                <MemoizedMessage
                  key={message._id}
                  message={message}
                  isCurrentUserSender={isCurrentUserSender}
                />
              );
            })}
            {typingUser && (
              <div className="text-gray-400 italic text-sm m-4 mb-10">
                🟡{" "}
                {typingUser?.senderModel === "GuestUser" ? "Client" : "Realtor"}{" "}
                is typing...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
