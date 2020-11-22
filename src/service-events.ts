const { createEventAdapter } = require('@slack/events-api');

interface eventService {
  init():void
  startListener(type:string, callback)
}

class EventsImpl implements eventService{
  private slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
  private port = process.env.PORT || 3000;
  static slackEvents: any;

  public async init () {
    const server = await this.slackEvents.start(this.port);
    console.log(`Listening for events on ${server.address().port}`);
  }

  public startListener(type, callback) {
    this.slackEvents.on(type, (event: any) => {
      return callback(event)
    });
  }
}

let Events = new EventsImpl()
Events.init();
export {Events};