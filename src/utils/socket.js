import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
