import { Users } from '@/services/users';

interface MessageService {
  generateResponse(event): String;
}
const debriefs = [
  "Hey What's Up?",
  "Hows it Hangin?",
  "What's your favourite Dinosaur?",
  "Do you like Radiohead?"
]
class MessageServiceImpl implements MessageService {
  private responses(response, user?) {
    let resp:string = "";
    let mentionUser = `<@${user.user}>`;
    switch(response) {
      case 'intro':
        resp = "Hi, " + mentionUser + ", I'm Responder Bot! Lets Chat. Here are "+
        "some commands you can type to interact with me.\n\n `_chat` " +
        "I'll ask you some questions. \n`_stop` I'll stop talking for the day! " +
        "No questions asked :).";
      case 'interact':
        resp = debriefs[0]
        Users.updateUser(user, { debrief: true})
    }
    return resp;
  }
  public generateResponse(event) {
    let user = Users.getOrSetUser(event);
    if (user.greetingDate === null) {
      Users.updateUser(user, {greeting: true});
      return this.responses('intro', user)
    } else if (event.text === '_chat') {
      return this.responses('debrief', user)
    }
  };
}

let Messages = new MessageServiceImpl()
export { Messages };