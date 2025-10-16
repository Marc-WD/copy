const mongoose = require('mongoose');

module.exports = async function connectDB() {
  return mongoose.connect(process.env.MONGO_URI, {});
};
