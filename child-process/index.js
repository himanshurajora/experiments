const { spawn, fork } = require("child_process");

const child = spawn("ls", ["/home/himanshu"]);

child.stdout.on("data", (data) => {
  console.log(`child stdout:\n${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`child stderr:\n${data}`);
});

child.on("exit", (code, signal) => {
  console.log(`child process exited with code ${code}, signal ${signal}`);
});

// specific to node js models
const child2 = fork("test.js");

child2.on("message", (message) => {
  console.log("Message from child2", message);
});

child2.send("Hello from parent");
