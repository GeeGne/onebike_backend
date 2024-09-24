const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const userController = {
  async getAllUsers (req, res) {
    try {
      const users = await User.getAll();
      if (!users) throw new Error ('coudln\'t get users');

      res.status(200).json(users);
    } catch (err) {
      console.error('Error: something went wrong: ', err);

      res.status(404).json({ message: err.message });
    }
  },
  async createNewUser (req, res) {
    try {
      const user = req.body;
      if (!user) throw new Error ('incorrect user format');

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(user.password, saltRounds);
      const result = await User.create(user.full_name, user.email, passwordHash, user.phone);
      if (!result) throw new Error ('error while saving new user');

      res.status(201).json(result);
    } catch (err) {
      console.error('Error: something went wrong: ', err);

      res.status(404).json({ message: err.message });
    }
  },
  async verifySignin (req, res) {
    try {
      const authInputs = req.body;

      const verify = await User.signIn(authInputs);
      if (!verify) throw new Error('Invalid email or password');

      res.status(200).json(verify);
    } catch (err) {
      console.error('Error verify has failed: ', err);
      res.status(400).json({ message: err.message });
    }
  }
};

module.exports = userController;
