const UserModel = require("../models/User");
const userCtrl = {};
userCtrl.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};
userCtrl.createUser = async (req, res) => {
  const { CC, username,password, name, lastname, rol, phone } = req.body;
  const newAdmin = new UserModel({
    CC,
    username,
    password,
    name,
    lastname,
    rol,
    phone,
  });
  await newAdmin.save();
  res.json("User Saved");
};
userCtrl.deleteUser = async(req, res) => {
    await UserModel.findByIdAndDelete(req.params.id)
  res.json("User Deleted");
};
userCtrl.getUser = async(req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.json(user);
};

module.exports = userCtrl;