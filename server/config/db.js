const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/jobportal')
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
    });
};

module.exports = connectToDatabase;
