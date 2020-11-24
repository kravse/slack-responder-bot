interface UsersService {
  getUser(userID)
}


class UsersServiceImpl implements UsersService {
  public Users = {}
  public getUser(userID) {
    return Users[userID] || {};
  };
}

let Users = new UsersServiceImpl()
export { Users };