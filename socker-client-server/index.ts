import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

import { io } from "socket.io-client";

const socket = io("http://localhost:9595");

socket.on("connect", () => {
  console.log("Connected to the server!");

  // join test room
  socket.emit("join", "test");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server!");
});

socket.on("message", (data) => {
  console.log(data);
});

socket.on("error", (error) => {
  console.error(error);
});

app.post("/upload", async (req, res) => {
  const fileName = req.query.fileName;
  console.log("Uploading file...", fileName);

  // join fileName room
  socket.emit("join", fileName);
  socket.emit("file-upload-progress", {
    roomId: fileName,
    type: "preparing",
    data: { fileName, progress: 0 },
  });

  // wait for 2 seconds to simulate file upload preparation

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });

  // mock file upload and send 100 progress events 1 per 100ms
  let progress = 0;
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      progress += 1;
      console.log("Progress", progress);

      // send progress to test room for preparing file upload progress bar

      // broadcast progress to fileName room
      socket.emit("file-upload-progress", {
        roomId: fileName,
        type: "uploading",
        data: { fileName, progress },
      });

      if (progress === 100) {
        clearInterval(interval);
        socket.emit("file-upload-progress", {
          roomId: fileName,
          type: "completed",
          data: { fileName, progress },
        });

        resolve(1);
      }
    }, 100);
  });

  res.send("File uploaded!");
});

app.listen(9001, () => {
  console.log("Server is running on port 3000");
});
