import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import PropertyList from "./PropertyList";
import ChatInput from "./ChatInput";
import { IoChatbubbles, IoChatbubblesOutline } from "react-icons/io5";
import { useGetMessagesForChatRoom } from "../../hooks/useMessage";
import socket from "../../utils/socket";
import { NoMessage } from "../../components/NoDataMsg";

export default function ChatInterface({ apiData, currentUserRole }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    if (apiData && currentUserRole) {
      const userId =
        currentUserRole === "GuestUser"
          ? selectedChatRoom?.client
          : selectedChatRoom?.realtor;

      if (userId) socket.emit("user_online", userId);
    }

    // return () => {
    //   socket.disconnect();
    // };
  }, [apiData, currentUserRole, selectedChatRoom]);

  useEffect(() => {
    socket.on("update_online_users", (users) => setOnlineUsers(users));

    return () => socket.off("update_online_users");
  }, []);

  useEffect(() => {
    if (apiData?.chatRooms) setChatRooms(apiData?.chatRooms);
  }, [apiData]);

  useEffect(() => {
    if (chatRooms.length > 0) {
      const storedId = localStorage.getItem("selectedChatRoomId");
      const savedRoom = chatRooms.find((room) => room._id === storedId);

      if (storedId && savedRoom) {
        setSelectedChatRoomId(storedId);
        setSelectedChatRoom(savedRoom);
      } else {
        setSelectedChatRoom(chatRooms[0]);
        setSelectedChatRoomId(chatRooms[0]?._id);
        localStorage.setItem("selectedChatRoomId", chatRooms[0]?._id);
      }
    }
  }, [chatRooms]);

  useEffect(() => {
    if (selectedChatRoomId) {
      const chatRoom = chatRooms.find(
        (room) => room._id === selectedChatRoomId
      );
      setSelectedChatRoom(chatRoom);
    }
  }, [selectedChatRoomId, chatRooms]);

  const handleSelectChatRoom = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
    setSelectedChatRoomId(chatRoom._id);
    localStorage.setItem("selectedChatRoomId", chatRoom._id);
  };

  const { isPending, messages: fetchedMessages } =
    useGetMessagesForChatRoom(selectedChatRoomId);

  useEffect(() => {
    setMessages([]);

    if (!isPending && fetchedMessages) setMessages(fetchedMessages);
  }, [selectedChatRoomId, isPending, fetchedMessages]);

  useEffect(() => {
    if (!selectedChatRoomId || !currentUserRole || !selectedChatRoom) return;

    const senderId =
      currentUserRole === "GuestUser"
        ? selectedChatRoom?.client
        : selectedChatRoom?.realtor;

    socket.emit("join_room", {
      chatroomId: selectedChatRoomId,
      userId: senderId,
    });

    socket.on("receive_message", (message) => {
      if (message.chatroom === selectedChatRoomId)
        setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedChatRoom, selectedChatRoomId, currentUserRole]);

  const onOpen = () => setIsOpen(!isOpen);

  // const { markAsSeen } = useMarkMessagesAsSeen();

  useEffect(() => {
    if (!selectedChatRoomId || !messages || messages.length === 0) return;

    const senderId =
      currentUserRole === "GuestUser"
        ? selectedChatRoom?.client
        : selectedChatRoom?.realtor;

    const hasUnseen = messages.some(
      (msg) => !msg.seen && msg.sender !== senderId
    );

    if (hasUnseen) {
      socket.emit("mark_as_seen", {
        chatroomId: selectedChatRoomId,
        userId: senderId,
      });
    }
    // markAsSeen({ chatroomId: selectedChatRoomId, userId: senderId });
  }, [selectedChatRoomId, currentUserRole, selectedChatRoom, messages]);

  useEffect(() => {
    socket.on("messages_seen", ({ chatroomId, seenBy }) => {
      if (chatroomId !== selectedChatRoomId) return;

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.sender !== seenBy ? { ...msg, seen: true } : msg
        )
      );
    });

    return () => {
      socket.off("messages_seen");
    };
  }, [selectedChatRoomId]);

  if (selectedChatRoom?.length === 0)
    return <NoMessage model="Chat Room" option={false} />;

  return (
    <main className="flex w-full h-[calc(100vh-13rem)] bg-white overflow-hidden rounded-3xl shadow-sm relative">
      <div
        className={`basis-[35rem] bigmobile:w-full bigmobile:h-full z-50 bg-white border-r transition-all ease-linear duration-300 border-gray-100 bigmobile:absolute bigmobile:-translate-x-full ${
          isOpen ? "bigmobile:translate-x-0" : "bigmobile:-translate-x-full"
        }`}
      >
        <div className="p-12 flex items-center justify-between">
          <h1 className="text-4xl heading-2">CHAT ROOM</h1>
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
        </div>

        <PropertyList
          chatRooms={chatRooms}
          onSelect={handleSelectChatRoom}
          selectedChatRoomId={selectedChatRoomId}
          onOpen={onOpen}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <ChatHeader
          currentUserRole={currentUserRole}
          selectedChatRoom={selectedChatRoom}
          onOpen={onOpen}
          isOpen={isOpen}
          selectedChatRoomId={selectedChatRoomId}
          onlineUsers={onlineUsers}
        />
        <ChatMessages
          loading={isPending}
          messages={messages}
          currentUserRole={currentUserRole}
        />
        <div className="border-t border-gray-100 p-8">
          {/* <button className="mb-8 w-full uppercase rounded-2xl border border-blue-500 py-6 text-blue-500 hover:bg-blue-50 font-semibold duration-300 ease-linear">
            request inspection
          </button> */}
          <ChatInput
            chatroomId={selectedChatRoomId}
            senderId={
              currentUserRole === "GuestUser"
                ? selectedChatRoom?.client
                : selectedChatRoom?.realtor
            }
            senderModel={currentUserRole}
            setMessages={setMessages}
          />
        </div>
      </div>
    </main>
  );
}
