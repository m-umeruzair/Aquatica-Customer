const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const signup= require('./routes/signUp')
const login= require('./routes/login')
const getProduct= require('./routes/getProduct')
const forgotpassword= require('./routes/forgotpassword')
const updateProfile= require('./routes/updateProfile');
const createOrder= require('./routes/createorder')





dotenv.config();
const app = express();
app.use(express.json())

const corsOptions = {
    exposedHeaders: "x-auth-token",
  };

  const DB_CONNECTION_STRING= process.env.db
app.use(cors());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(signup)
app.use(login)
app.use(getProduct)
app.use(forgotpassword)
app.use(updateProfile)
app.use(createOrder)


app.listen(process.env.PORT, (error) => {
  
    if (error) {
      console.error("Error Occurred while connecting to server: ", error);
    } else {
      console.log("Connected to Server Successfully!");
  
      console.log("Trying to connect to database server...");
  
      mongoose.connect(DB_CONNECTION_STRING, (dbError) => {
        if (dbError) {
          console.error("Error Occurred while connecting to database: ", dbError);
        } else {
          console.log("Connected to Database Successfully!");
        }
      });
    }
  });