const { WebClient } = require('@slack/web-api');

interface SlackWebService {
  init();
  respond(event, msg:string)
}
class SlackWebServiceImpl implements SlackWebService {
  private web;

  public init() {
    this.web = new WebClient(process.env.SLACK_TOKEN);
  }

  public async respond(event, msg:string) {
    try {
      // Use the `chat.postMessage` method to send a message from this app
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
      await this.web.chat.postMessage({
        channel: event.user,
        text: msg
      });
    } catch (error) {
      console.log(error);
    }
  }
}

let SlackWebClient = new SlackWebServiceImpl()
export { SlackWebClient };