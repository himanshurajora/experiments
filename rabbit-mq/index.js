const mq = require("amqplib/callback_api");

const RABBITMQ_URL = "amqp://user:password@localhost:5672";

mq.connect(RABBITMQ_URL, (err, conn) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Connected to RabbitMQ");

  const queue = `deliveryQueue`;

  conn.createChannel((err, ch) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    ch.assertQueue(queue, { durable: true });

    ch.prefetch(2);

    ch.consume(
      queue,
      (msg) => {
        console.log("Received message: %s", msg.content.toString());
        setTimeout(() => {
          ch.ack(msg);
        }, 3000);
      },
      { noAck: false }
    );

    setInterval(() => {
      ch.sendToQueue(queue, Buffer.from("Hello from Node.js!"));
    }, 1000);
  });

  process.on("exit", () => {
    conn.close();
  });
});
