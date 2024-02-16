const { model, Schema } = require('mongoose');

const MessageSchema = new Schema({
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
  // Add any other fields if necessary
});

const MessageModel = model('Message', MessageSchema);

module.exports = MessageModel;
