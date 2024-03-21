const redis = require("redis");

async function doit() {
  const client = redis.createClient();
  client.on("error", (err) => {
    console.log(err);
  });
  await client.connect();
  await client.set("test", "test");

  const res = await client.get("test");
  console.log(res);

  console.log("---------------- Now doing hset");

  await client.hSet("t", "a", "1");
  await client.hSet("t", "b", "2");

  const result = await client.hGetAll("t");

  console.log({ result });

  await client.del("hs");

  let value = await client.hKeys("hs");
  console.log(value);

  const keyValues = ["1", "HI", "2", "There"];
  await client.hSet("hs", "2", "Hi");

  const value2 = await client.hKeys("hs");
  console.log(value2);
  process.exit();
}

doit();
