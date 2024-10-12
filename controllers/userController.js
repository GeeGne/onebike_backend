const { User } = require('../models/UserModel');
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
      if (!name || !email || !phone || !password ) return res.status(400).json({ message: 'incorrect user format'});

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const result = await User.create(name, email, passwordHash, phone);

      const token = createToken({ id: result.insertId, email, role: 'user' })

      res.cookie('jwt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      res.status(201).json({ message: 'User created successfully!', result });
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

      const token = createToken({ id: user.id, email: user.email, role: user.role });
      res.cookie('jwt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      res.status(200).json({ message: 'Validating password and email was successful.' });
    } catch (err) {
      console.error('Error verify has failed: ', err);
      res.status(400).json({ message: err.message });
    }
  },
  async signUserOut (req, res) {
    res.clearCookie('jwt_token');
    res.status(200).json({ message: 'Cookie removed' })
  },
  async updateUserProfile (req, res) {
    try {
      const updatedData = req.body;
      const id = Number(req.params.id);
  
      const result = await User.updateProfile({id, ...updatedData})
      
      res.status(201).json({ message: 'User profile updated successfully!', result });
    } catch (err) {
      console.error('Error while updating user profile: ', err);
      res.status(404).json( { message: err.message } );
    }
  },
  async getUser (req, res) {
    try {
      const userToken = req.user;
      if (!userToken) throw new Error ('no Token');

      const user = await User.getById(userToken.id);
      if (!user) throw new Error ('couldn\'t get user');

      res.status(200).json(user);
    } catch (err) {
      console.error('Error: failed to get userInfo: ', err);
      res.status(401).json({ message: err.message });
    }
  }
};

module.exports = userController;
