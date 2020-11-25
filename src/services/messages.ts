import { Users } from '@/services/users';

interface MessageService {
  generateResponse(event): String;
}



class MessageServiceImpl implements MessageService {
  private responses(response, user?) {
    let resp:string = "";
    switch(response) {
      case 'intro':
        resp = "Hi, I'm rubberDuck! I'm here to help you reflect on some of "+
        "your work experiences. But first, a bit of housekeeping. Here are "+
        "some commands you can type to interact with me.\n\n `_chat` " +
        "I'll ask you some questions. \n`_stop` I'll stop talking for the day! " +
        "No questions asked :).";
      case 'intro':
        resp = "What do you want to talk about?";

    }
    return resp;
  }
  public generateResponse(event) {
    let user = Users.getOrSetUser(event);
    if (user.greetingDate === null) {
      Users.updateUser(user, {greeting: true});
      return this.responses('intro')
    } else {
      return this.responses('generalQuestions', user)
    }
  };
}

let Messages = new MessageServiceImpl()
export { Messages };