const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Default role is 'user'
});

const UserModel = model('User', UserSchema);

module.exports = {
  create: async (data) => {
    try {
      const newUser = await UserModel.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  read: async () => {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  },
};
