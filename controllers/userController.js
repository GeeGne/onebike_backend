const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');

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
      const {name, email, phone, password} = req.body;
      if (!name || !email || !phone || !password ) throw new Error ('incorrect user format');

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const result = await User.create(name, email, passwordHash, phone);
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

      const user = await User.signIn(authInputs);
      if (!user) throw new Error('Invalid email or password');
      console.log(user);

      const token = createToken({ id: user.id, email: user.email, role: user.role })

      res.cookie('jwt_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      res.status(200).json(user);
    } catch (err) {
      console.error('Error verify has failed: ', err);
      res.status(400).json({ message: err.message });
    }
  },
  async signUserOut (req, res) {
    res.clearCookie('jwt_token');
    res.status(200).json({ message: 'Cookie removed' })
  },
  async updateUserInfo () {

  },
  async getUser (req, res) {
    try {
      const userToken = req.user;
      if (!userToken) throw new Error ('no Token');

      const user = await User.getUser(userToken.email);
      if (!user) throw new Error ('couldn\'t get user');

      res.status(200).json(user);
    } catch {
      console.error('Error: failed to get userInfo: ', err);
      res.status(404).json({ message: err.message });
    }
  }
};

module.exports = userController;
