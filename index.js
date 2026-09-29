require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});


// /ritz-catfact
app.command("/ritz-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");

    await respond({
      text: `Cat Fact:\n${response.data.fact}`
    });

  } catch (err) {
    console.error(err);

    await respond({
      text: "Failed to fetch a cat fact."
    });
  }
});


// /ritz-joke
app.command("/ritz-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );

    await respond({
      text: `${response.data.setup}

${response.data.punchline}`
    });

  } catch (err) {
    console.error(err);

    await respond({
      text: "Failed to fetch a joke."
    });
  }
});


// /ritz-ping
app.command("/ritz-ping", async ({ ack, respond }) => {
  const start = Date.now();

  await ack();

  const latency = Date.now() - start;

  await respond({
    text: `Pong!\nLatency: ${latency}ms`
  });
});


// Start bot
(async () => {
  await app.start();
  console.log("bot is running!");
})();