import { createClient } from "redis";

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

const toast = "ax";
const existing = await client.json.get("user");

if (!existing[toast]) {
  await client.json.set("user", `$.${toast}`, 0);
}

await client.json.numIncrBy("user", `$.${toast}`, 1);
// await client.json.set("user", "$", { name: "Himanshu", age: 1 });
const value = await client.json.get("user");
console.log(value);

await client.disconnect();
