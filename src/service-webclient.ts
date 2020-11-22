const { WebClient } = require('@slack/web-api');
const web = new WebClient(process.env.SLACK_TOKEN);

interface webService {
  respond(event)
}
class webServiceImpl implements webService {
  public async respond(event) {
    try {
      // Use the `chat.postMessage` method to send a message from this app
      let msg = "Hi, I'm RubberDuck! I'll ask you questions about your day. Get started by typing `ask`.";
      // if (event.text.toLowerCase() === "ask" || introduced) {
      //   if (status === 'question') {
      //     if (currentQuestion > questions.length) {
      //       msg = "Wow, sounds like you had a great day!"
      //     } else {
      //       msg = questions[currentQuestion];
      //       currentQuestion++;
      //     }
      //   } else {
      //     msg = followups[Math.floor(Math.random() * questions.length)];
      //   }
      //   status = status === 'question' ? 'followup' : 'question';
      // }
      // introduced = true;
      await web.chat.postMessage({
        channel: event.user,
        text: msg
      });
    } catch (error) {
      console.log(error);
    }

  }
}


let webclient = new webServiceImpl()
export { webclient };