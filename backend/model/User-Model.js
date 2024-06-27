const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    ID: {
      type: String,
      required: false,
    },
    UserName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Confirm: {
      type: String,
      required: true,
    },
    Profile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;
