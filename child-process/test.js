console.log("Hello This is the child test.js process");

process.send("Hello from child test.js, new message from child process");

process.on("message", (message) => {
  console.log("Message from parent", message);
});
