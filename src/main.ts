require('dotenv').config()
import { Events } from './service-events';
// import { webclient } from './service-webclient';


Events.startListener('message', (event:any) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
})


// webclient.respond('hi');