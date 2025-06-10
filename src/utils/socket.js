import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5173";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
