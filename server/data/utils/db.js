const mongoose = require('mongoose');

const connectDB = () => {
  const dbLink = process.env.DB_LINK;

  if (!dbLink) {
    console.error('MongoDB connection URI is not defined. Please check your environment variables.');
    return;
  }

  mongoose.connect(dbLink, {
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(error => console.error('Error connecting to MongoDB:', error.message));
};

module.exports = connectDB;
