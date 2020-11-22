require('dotenv').config()
import { Events } from './service-events';
import { Webclient } from './service-webclient';

Events.startListener('message', (event:any) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  if (!event.bot_id) {
    Webclient.respond(event);
  }
});