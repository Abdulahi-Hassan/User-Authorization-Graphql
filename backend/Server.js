const express = require("express");
const Server = require("./config/Server");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

let mongodb = mongoose.connect(
  "mongodb=mongodb+srv://libanabdulahi2024:zNRiQgNiIgAJ8oX5@cluster0.aeteeum.mongodb.net/Mern-Chat-App?retryWrites=true&w=majority&appName=Cluster0"
);
Server.listen(process.env.PORT || 3000, mongodb, () =>
  console.log(process.env.SERVER || "Server running on Port 3000")
);
