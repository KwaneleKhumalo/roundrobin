require("dotenv").config();
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_URI;

const connectToDb = () => {
  mongoose.connect(connectionString).then(() =>{
   console.log('Connected');
  })
};


module.exports = connectToDb