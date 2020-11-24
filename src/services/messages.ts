import { Users } from '@/services/users';

interface MessageService {
  generateResponse(event): String;
}

class MessageServiceImpl implements MessageService {
  public generateResponse(event) {
    let user = Users.getOrSetUser(event);
    if (user.greetingDate === null) {
      Users.updateUser(user, {greeting: true});
      return "Hi, I'm rubberDuck!";
    } else {
      return "What do you want to talk about?"
    }
  };
}

let Messages = new MessageServiceImpl()
export { Messages };