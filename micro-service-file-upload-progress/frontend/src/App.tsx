import { useEffect, useState } from "react";
import "./App.css";

let socketServer: WebSocket;

function App() {
  const [count, setCount] = useState(0);
  const [uuid, setUuid] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");
    socket.onopen = () => {
      console.log("Connection opened");
    };

    socket.onmessage = (event) => {
      console.log(event.data);
      if (event.data.roomId === uuid) {
        console.log(event.data);
      }
    };

    socket.onclose = () => {
      console.log("Connection closed");
      // try to reconnect
      setTimeout(() => {
        socketServer = new WebSocket("ws://localhost:4000");
      }, 1000);
    };

    socket.onerror = (error) => {
      console.error(error);
    };

    socketServer = socket;

    return () => {
      socket.close();
    };
  }, []);

  const sendSocketMessage = async () => {
    // send hello message to the server
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);

    await fetch("http://localhost:3002/upload-file", {
      method: "POST",
      body: JSON.stringify({ fileId: newUuid, ui: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <h1>
      Hello, World! {count}
      <button
        onClick={() => {
          setCount(count + 1);
          sendSocketMessage();
        }}
      >
        Increment
      </button>
    </h1>
  );
}

export default App;
