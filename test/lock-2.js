import redis from "ioredis";
import RedLock from "redlock";
// Connect to Redis
const client = redis.createClient();

const redlock = new RedLock(
  // You should have one client for each independent redis node
  // or cluster.
  [client],
  {
    // The expected clock drift; for more details see:
    // http://redis.io/topics/distlock
    driftFactor: 0.01, // multiplied by lock ttl to determine drift time

    // The max number of times Redlock will attempt to lock a resource
    // before erroring.
    retryCount: 10,

    // the time in ms between attempts
    retryDelay: 200, // time in ms

    // the max time in ms randomly added to retries
    // to improve performance under high contention
    // see https://www.awsarchitectureblog.com/2015/03/backoff.html
    retryJitter: 200, // time in ms

    // The minimum remaining time on a lock before an extension is automatically
    // attempted with the `using` API.
    automaticExtensionThreshold: 500, // time in ms
  }
);

client.once("connect", async () => {
  // Set a test value

  // await redlock.acquire(["testKey"], 3000);
  await client.set("testKey", "testValue");

  // Retrieve the value
  const value = await client.get("testKey");

  // Log the value
  console.log(value);
  process.exit();
});
