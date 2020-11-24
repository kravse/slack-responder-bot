require('dotenv').config();
import { SlackEvents } from '@/services/slack-events';
import { SlackWebClient } from '@/services/slack-webclient';
import { Messages } from '@/services/messages';

let init = async () => {
  SlackEvents.init();
  SlackWebClient.init();

  await SlackEvents.slackEventsListener('message', (event: any) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    if (!event.bot_id && event.text) {
      let messageResponse = Messages.generateResponse(event);
      if (messageResponse) SlackWebClient.respond(event, messageResponse);
    }
  });
}

(async () => {
  init();
})();

