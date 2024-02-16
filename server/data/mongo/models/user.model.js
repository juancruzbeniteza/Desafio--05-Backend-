const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  // Add any other fields if necessary
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
