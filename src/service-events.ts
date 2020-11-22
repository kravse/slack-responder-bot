const { createEventAdapter } = require('@slack/events-api');

interface eventService {
  init()
}

class EventsImpl implements eventService{
  private slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
  private port = process.env.PORT || 3000;
  static slackEvents: any;
  // static init: any;

  public async init() {
    this.slackEvents.on('message', (event: any) => {
      console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
      // console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
      // if (!event.bot_id) {
      // respond(event);
      // }
    });
    const server = await this.slackEvents.start(this.port);
    console.log(`Listening for events on ${server.address().port}`);
  }
}

let Events = new EventsImpl()
export {Events};