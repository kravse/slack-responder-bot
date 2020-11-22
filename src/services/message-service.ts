
interface MessageService {
  generateResponse(event): String;
}


class MessageServiceImpl implements MessageService {

  public generateResponse(event) {

    return 'hi';
  };
}

let Messages = new MessageServiceImpl()
export { Messages };