const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/users')
  .get(userController.getAllUsers)

router.route('/signup')
  .post(userController.createNewUser);

router.route('/signin')
  .post(userController.verifySignin);

module.exports = router;