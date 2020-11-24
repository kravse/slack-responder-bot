interface UsersService {
  getOrSetUser(userID);
  setUser(user);
  updateUser(user, config)
}
function User(userObj, greetingDate?:Number) {
  this.user = userObj.user;
  this.channel = userObj.channel,
  this.greetingDate = greetingDate || null;
  this.lastInteraction = new Date().getTime();
}

class UsersServiceImpl implements UsersService {
  private activeUsers = new Map();

  public getOrSetUser(user) {
    console.info(this.activeUsers)
    if (!this.activeUsers.has(user.user)) {
      this.setUser(user)
    }
    return this.activeUsers.get(user.user)
  }
  public setUser(user) {
    this.activeUsers.set(user.user, new User(user))
    console.info(this.activeUsers);
  };
  public updateUser(user, config) {
    if (!this.activeUsers.has(user.user)) return;
    if (config.greeting) {
      this.activeUsers.set(user.user, new User(user, new Date().getTime()))
    }
    console.info('updateuser', this.activeUsers)
  }
}

let Users = new UsersServiceImpl()
export { Users };