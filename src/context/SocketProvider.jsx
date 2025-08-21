import { createContext, useEffect } from "react";
import socket from "../utils/socket";
import { useUser } from "../hooks/useAuth";

export const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const { user, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      socket.connect();
      socket.emit("user_online", user?._id);

      return () => socket.disconnect();
    }
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
