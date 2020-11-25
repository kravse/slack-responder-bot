interface UsersService {
  getOrSetUser(userID);
  updateUser(user, config)
}

function User(userObj) {
  this.user = userObj.user;
  this.channel = userObj.channel,
  this.lastInteraction = new Date().getTime();
}

class UsersServiceImpl implements UsersService {
  private activeUsers = new Map();

  public getOrSetUser(user) {
    console.info(this.activeUsers)
    if (!this.activeUsers.has(user.user)) {
      this.activeUsers.set(user.user, new User(user))
    }
    return this.activeUsers.get(user.user)
  }
  public updateUser(user, config) {
    if (!this.activeUsers.has(user.user)) return;
    let now = new Date().getTime();
    if (config.greeting) {
      user.greetingDate = now;
      user.lastInteraction = now;
    }
    if (config.debrief) {
      user.debrief = config.debrief
    }
    this.activeUsers.set(user.user, user)
    console.info('updateuser', this.activeUsers)
  }
}

let Users = new UsersServiceImpl()
export { Users };