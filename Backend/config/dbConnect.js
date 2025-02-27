// Establishing the connection between the database and server with mongoose;

const mongoose = require("mongoose");


// By this line , All the information present in the enviroment variable will stored in the process object  
require("dotenv").config();

const dbconnect = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with a non-zero status code to indicate an error
      }
}
module.exports = dbconnect;