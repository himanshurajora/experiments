import { Server, Socket } from "socket.io";
import { isStringObject } from "util/types";

const io = new Server(9191, {
  cors: {
    origin: "*",
  },
});

const idSocketMap: Record<
  string | number,
  {
    peerId: string;
    socket: Socket;
  }
> = {};

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  socket.emit("connected");

  socket.on("register-peer", ({ id, peerId }) => {
    idSocketMap[id] = { peerId, socket };
  });

  socket.on("get-peer", ({ id, myId }) => {
    const peer = idSocketMap[id];
    if (!peer) return;
    const { peerId, socket: peerSocket } = peer;
    socket.emit("handle-peer", peerId);
    peerSocket.emit("connection-peer", { peerId: myId });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });

  socket.on("message", (data) => {
    console.log("Message received", data);
    socket.emit("message", data);
  });
});
