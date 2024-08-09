import { Peer } from "peerjs";
import { io } from "socket.io-client";

const id = 2;
const socket = io("ws://localhost:9191", { autoConnect: false });
const peer = new Peer();
let isPeerConnected = false;
let isSocketConnected = false;
let isPeerConnectionSuccess = false;
let isPeerIdFound = false;
let connectedPeerId = "";

peer.on("error", (error) => {
  console.log("error", error);
});

peer.on("connection", (connection) => {
  console.log("Connected");
  isPeerConnectionSuccess = true;
  if (isPeerIdFound) {
    call();
  }
});

socket.on("connected", () => {
  handleConnection();
});

socket.on("error", (err) => {
  console.log("ERR SOCKET", err);
  isSocketConnected = false;
  retryConnection();
});

peer.on("open", (id) => {
  console.log(id, "THIS IS ME");
  isPeerConnected = true;
  socket.connect();
  if (isSocketConnected) {
    informPeerId(peer.id);
  }
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
  isSocketConnected = false;
  retryConnection();
});

socket.on("handle-peer", (peerId) => {
  console.log("Handling peer", peerId);
  peer.connect(peerId);
});

socket.on("connection-peer", ({ peerId }) => {
  connectedPeerId = peerId;
  isPeerIdFound = true;
  if (isPeerConnectionSuccess) {
    call();
  }
});

function retryConnection() {
  if (!isSocketConnected) {
    setTimeout(() => {
      console.log("Retry");
      socket.connect();

      retryConnection();
    }, 2000);
  }
}

function handleConnection() {
  console.log("Connected to socket server");
  isSocketConnected = true;

  if (isPeerConnected) {
    informPeerId(peer.id);
  }
}

function informPeerId(peerId: string) {
  console.log("informed peer id", peerId);
  socket.emit("register-peer", { id, peerId });
}

function getPeer(id: number) {
  socket.emit("get-peer", id);
}

const connectBtn = document.getElementById("connect-btn") as HTMLButtonElement;

connectBtn.onclick = () => {
  console.log("geeting peer");
  getPeer(2);
};

function call() {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    console.log(connectedPeerId);
    // peer.connect(connectedPeerId);
    const call = peer.call(connectedPeerId, stream);
  });
}
