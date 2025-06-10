import { useRef, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import socket from "../../utils/socket";

export default function ChatInput({
  chatroomId,
  senderId,
  senderModel,
  setMessages,
}) {
  const [content, setContent] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const messageData = {
      chatroom: chatroomId,
      sender: senderId,
      senderModel,
      content,
      timestamp: new Date(),
      pending: true,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, pending: true },
    ]);

    if (socket.connected) {
      socket.emit("new_message", messageData, () => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.timestamp === messageData.timestamp
              ? { ...msg, pending: false }
              : msg
          )
        );
      });
    } else console.warn("Socket disconnected before message was acknowledged");

    setContent("");
    socket.emit("stop_typing", {
      chatroomId,
      user: { _id: senderId, senderModel },
    });
  };

  const handleTyping = (e) => {
    setContent(e.target.value);

    socket.emit("typing", { chatroomId, user: { _id: senderId, senderModel } });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        chatroomId,
        user: { _id: senderId, senderModel },
      });
    }, 2000);
  };
  return (
    <form onSubmit={handleSend} className="flex items-center gap-4">
      <textarea
        value={content}
        onChange={handleTyping}
        placeholder="Type a message..."
        className="flex-1 rounded-2xl border border-gray-200 px-8 py-6 focus:border-transparent duration-500 ease-linear transition-colors resize-none"
      />
      <button
        type="submit"
        className="rounded-2xl bg-blue-500 px-10 py-6 font-medium text-blue-50 capitalize hover:bg-blue-600 hover:text-blue-100 duration-500 ease-linear transition-colors flex flex-row-reverse items-center gap-5 "
      >
        <HiOutlinePaperAirplane size={20} />
        <span className="smmobile:hidden">send</span>
      </button>
    </form>
  );
}
