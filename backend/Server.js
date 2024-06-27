const express = require("express");
const Server = require("./config/Server");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
let mongodb = mongoose.connect("mongodb://localhost:27017/User-Authorization");
Server.listen(3000, mongodb, () => console.log(process.env.SERVER));
