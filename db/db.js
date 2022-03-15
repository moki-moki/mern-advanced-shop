const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(`MongoDB Connected Yaay`);
    return mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      //   useCreateIndex: true,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
