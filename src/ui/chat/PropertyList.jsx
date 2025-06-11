export default function PropertyList({
  chatRooms,
  onSelect,
  onOpen,
  selectedChatRoomId,
}) {
  return (
    <ul className="flex flex-col gap-10 cursor-pointer p-5 overflow-y-auto overflow-x-hidden">
      {chatRooms &&
        chatRooms?.map((chatRoom, index) => {
          return (
            <li
              title={chatRoom.property.title}
              onClick={() => {
                onSelect(chatRoom);
                onOpen(false);
              }}
              key={index}
              className={`w-full overflow-hidden flex rounded-3xl gap-5 p-6 duration-500 hover:bg-gray-50 ${
                selectedChatRoomId === chatRoom._id
                  ? "bg-gradient-to-tr from-sky-50 to-blue-100"
                  : ""
              }`}
            >
              <img
                src={chatRoom.property.images[0].url}
                alt={chatRoom.property.title}
                className="h-32 w-32 rounded-xl object-cover"
              />
              <div className="w-full">
                <div className="w-3/5 ">
                  <h3 className="text-sky-500 truncate">
                    {chatRoom.property.title}
                  </h3>
                </div>
                <p className="text-slate-500 italic">
                  {chatRoom.property.address.city}
                </p>
                {typeof chatRoom.realtor === "string" ? null : (
                  <p className="uppercase font-semibold">
                    {chatRoom.realtor.fullname?.split(" ")[0] +
                      " " +
                      chatRoom.realtor.fullname?.split(" ")?.[1]}
                  </p>
                )}
                {typeof chatRoom.client === "string" ? null : (
                  <p className="uppercase font-semibold">
                    {chatRoom.client.name?.split(" ")[0] +
                      " " +
                      chatRoom.client.name?.split(" ")?.[1]}
                  </p>
                )}
              </div>
            </li>
          );
        })}
    </ul>
  );
}
