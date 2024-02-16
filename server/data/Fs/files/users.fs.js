const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

class UserFsManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async create(data) {
    try {
      const users = await this.read();
      const newUser = {
        id: uuidv4(),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };

      users.push(newUser);
      await this.save(users);
      return newUser;
    } catch (error) {
      console.error('Error adding user:', error.message);
      return null;
    }
  }

  async read() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading users:', error.message);
      return [];
    }
  }

  async readOne(id) {
    const users = await this.read();
    return users.find(user => user.id === id);
  }

  async destroy(id) {
    try {
      const users = await this.read();
      const updatedUsers = users.filter(user => user.id !== id);
      await this.save(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  }

  async save(users) {
    try {
      await fs.writeFile(this.path, JSON.stringify(users, null, 2), 'utf8');
      console.log('Users saved successfully.');
    } catch (error) {
      console.error('Error saving users:', error.message);
    }
  }
}

module.exports = UserFsManager;
