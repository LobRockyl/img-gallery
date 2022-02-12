const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://purnashis:purnashis@cluster0.lhecz.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB; 
