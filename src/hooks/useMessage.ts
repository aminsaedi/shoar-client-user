import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import {
  ClientToServerEvents,
  ConnectionStatusType,
  ServerToClientEvents,
} from "../types";

export const defaultMessage = "در انتظار <br /> ...";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://192.168.0.21:3000"
);

export default function useMessage() {
  const [isConnected, setIsConnected] = useState<ConnectionStatusType>(
    socket?.connected ? "متصل" : "قطع"
  );
  const [message, setMessage] = useState<string>(defaultMessage);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected("متصل");
    });

    socket.on("disconnect", () => {
      setIsConnected("قطع");
    });

    socket.on("next", (i) => setMessage(i));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return { message, isConnected };
}
