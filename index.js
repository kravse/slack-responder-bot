require('dotenv').config()
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackEvents = createEventAdapter(slackSigningSecret);
const port = process.env.PORT || 3000;
const web = new WebClient(process.env.SLACK_TOKEN);

const questions = [
  "How was your meeting?",
  "What did you learn?",
  "Did anything stand out to you as surprising?",
  "How do you feel after your meeting?",
];

const followups = [
  "Oh interesting.Can you say more?",
  "Why do you think that is?",
  "How did that make you feel?"
];
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    // console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  if (!event.bot_id) {
    respond(event);
  }
});
let status = 'question';
let currentQuestion = 0;
let introduced = false;
async function respond (event) {
  try {
    // Use the `chat.postMessage` method to send a message from this app
    let msg = "Hi, I'm RubberDuck! I'll ask you questions about your day. Get started by typing `ask`.";
    if (event.text.toLowerCase() === "ask" || introduced) {
      if (status === 'question') {
        if (currentQuestion > questions.length) {
          msg = "Wow, sounds like you had a great day!"
        } else {
          msg = questions[currentQuestion];
          currentQuestion++;
        }
      } else {
        msg = followups[Math.floor(Math.random() * questions.length)];
      }
      status = status === 'question' ? 'followup' : 'question';
    }
    introduced = true;
    await web.chat.postMessage({
      channel: event.user,
      text: msg
    });
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  const server = await slackEvents.start(port);
  console.log(`Listening for events on ${server.address().port}`);
})();