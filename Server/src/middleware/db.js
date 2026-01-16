require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let dbConnection;


const options = {
  dbName: process.env.DB_NAME || "koko_chatbot_db",
};

exports.connectToDatabase = async (req, res, next) => {
  const mongoURI =
    process.env.DB_STRING ||
    "mongodb+srv://pintukumar808284:ZyLWuB7bdBrOebml@cluster0.kqbqscz.mongodb.net/?retryWrites=true&w=majority";
  if (dbConnection) {
    console.log("----DB----PREVIOUS-CONNECTION----------------");
    next();
  } else {
    console.log("process.env.DB_STRING, options ", mongoURI);
    mongoose.connect(mongoURI, options).then(
      (db) => {
        console.log("----DB----NEW-CONNECTION----------------");
        dbConnection = db.connections[0].readyState;
        console.log("----DB----NEW-CONNECTION-INIT----------------");
        next();
      },
      (err) => {
        console.log("----DB----ERROR-CONNECTION----------------");
        console.log(err);
        return res.send({
          status_code: 409,
          success: false,
          message: "DB connection failure",
        });
      }
    );
  }
};
