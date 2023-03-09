require("dotenv").config();
const mongoose = require("mongoose");

const connectToDb = (uri) => {
  return mongoose.connect(uri)
};

// Function to run the application
const runApp = async (application, portEntry) => {
  const connectionString = process.env.MONGO_URI;
  try {
   await connectToDb(connectionString)
   application.listen(portEntry, () => {
    console.log(`Running on ${portEntry}`);
   })
  }
  catch(error) {
   console.log(error);
  }
 }


module.exports = runApp