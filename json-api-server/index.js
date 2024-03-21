const http = require("http");
const fortune = require("fortune");
const fortuneHTTP = require("fortune-http");
const jsonApiSerializer = require("fortune-json-api");

const store = fortune({
  user: {
    name: String,

    // Following and followers are inversely related (many-to-many).
    following: [Array("user"), "followers"],
    followers: [Array("user"), "following"],

    // Many-to-one relationship of user posts to post author.
    posts: [Array("post"), "author"],
  },
  post: {
    message: String,

    // One-to-many relationship of post author to user posts.
    author: ["user", "posts"],
  },
});

const listener = fortuneHTTP(store, {
  serializers: [
    // The `options` object here is optional.
    [jsonApiSerializer],
  ],
});
const server = http.createServer((request, response) =>
  listener(request, response).catch((error) => {
    /* error logging */
  })
);

store.connect().then(async () => {
  const user1 = await store.create("user", [{ name: "User 1" }]);
  const user2 = await store.create("user", [
    { name: "User 2", following: [user1.payload.records[0].id] },
  ]);

  console.log(user1.payload.records, user2.payload.records);

  server.listen(2222);
});
