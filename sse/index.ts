import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (request, response) => {
  // send sse headers
  response.status(200).set({
    connection: "keep-alive",
    "cache-control": "no-cache",
    "content-Type": "text/event-stream",
  });

  let a = 1;
  setInterval(() => {
    response.write(`data: ${a}\n\n`);
    a++;
  }, 1000);

  request.on("close", () => {
    console.log("Client closed connection. Stopping sending events.");
    response.end();
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`);
});
