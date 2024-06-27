const User = require("../model/User-Model");
const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    async GetAllUsers() {
      const users = await User.find();
      return users;
    },
    async GetUserByID(_, { ID }) {
      const user = await User.findById(ID);
      return user;
    },
  },
  Mutation: {
    async InsertUser(_, { AddUser: { UserName, Email, Password, Profile } }) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(Password, salt);
      let Insert = new User({
        UserName,
        Email,
        Password: hash,
        Profile,
        Confirm: Password,
      });
      Insert.ID = Insert._id;
      let Info = await Insert.save();
      return {
        ID: Info._id,
        Message: "User Inserted Successfully",
        ...Info._doc,
      };
    },
    async UpdateUser(_, { ID, EditUser }) {
      const { UserName, Email, Password, Profile,Confirm } = EditUser;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(Password, salt);
      let Edit = await User.findByIdAndUpdate(ID, {
        Email,
        Password: hash,
        Profile,
        UserName,
        Confirm
      });
      return {
        ...Edit._doc,
      };
    },
    async DeleteUser(_, { ID }) {
      const Delete = await User.findByIdAndDelete(ID);
      return {
        ...Delete._doc,
      };
    },
  },
};
module.exports = resolvers;
