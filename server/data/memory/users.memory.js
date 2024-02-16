const { v4: uuidv4 } = require('uuid');

class UserMemoryManager {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const newUser = {
      id: uuidv4(),
      name: data.name,
      photo: data.photo,
      email: data.email,
    };

    this.users.push(newUser);
    return newUser;
  }

  async read() {
    return this.users;
  }

  async readOne(id) {
    return this.users.find(user => user.id === id);
  }

  async destroy(id) {
    this.users = this.users.filter(user => user.id !== id);
  }
}

module.exports = UserMemoryManager;
