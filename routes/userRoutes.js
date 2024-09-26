const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {checkAuth, admin} = require('../middleware/authMiddleware');

router.route('/')
  .get(checkAuth, admin, userController.getAllUsers);

router.route('/auth/me')
  .get(checkAuth, userController.getUser);

router.route('/signup')
  .post(userController.createNewUser);

router.route('/signin')
  .post(userController.verifySignin);

router.route('/signout')
  .post(userController.signUserOut);

// router.route('/user/update')
  // .post(checkAuth, userController.updateUserInfo);

module.exports = router;