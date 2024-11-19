const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/library-management-system");

const db =mongoose.connection;

db.on("connected",()=>{
  console.log("MongoDB connected successfully..!");
})

db.on("disconnected",()=>{
  console.log("MongoDB disconnected..!");
})

db.on("error",()=>{
  console.log("Something went wrong MongoDB not connected..!");
})

module.exports = db;