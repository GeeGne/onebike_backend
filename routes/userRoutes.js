const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkAuth, admin, me } = require('../middlewares/authMiddleware');

router.route('/')
  .get(checkAuth, admin, userController.getAllUsers);

router.route('/user/profile/:id')
  .put(checkAuth, me, userController.updateUserProfile);

router.route('/auth/me')
  .post(checkAuth, userController.getUser);

router.route('/signout')
  .post(userController.signUserOut);

router.route('/signup')
  .post(userController.createNewUser);

router.route('/signin')
  .post(userController.verifySignin);

// router.route('/user/update')
  // .post(checkAuth, userController.updateUserInfo);

module.exports = router;