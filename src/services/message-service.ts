import { Users } from '@/services/users-service';

interface MessageService {
  generateResponse(event): String;
}

Users.getUser('hi');

class MessageServiceImpl implements MessageService {
  public generateResponse(event) {

    return 'hi';
  };
}

let Messages = new MessageServiceImpl()
export { Messages };