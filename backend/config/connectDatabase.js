const mongoose = require('mongoose');

const connectMongoDb = () => {
  const mongoUri = process.env.connectingMongoDb; // This now points to 'mongodb://0.0.0.0:27017/mydatabasers'

  if (!mongoUri) {
    throw new Error('MongoDB connection URI is not defined in environment variables.');
  }

  mongoose.connect(mongoUri)
    .then((con) => {
      console.log('MongoDB connected successfully: ' + con.connection.host);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
};

module.exports = connectMongoDb;
