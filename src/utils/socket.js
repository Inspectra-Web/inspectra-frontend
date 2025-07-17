import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
// || import.meta.env.VITE_SOCKET_URL;
const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
