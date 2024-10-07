const express = require('express');
const router = express.Router();
const socialLinksController = require('../controllers/socialLinksController');
const { checkAuth, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(socialLinksController.getSocialLinks)
  .put(checkAuth, admin, socialLinksController.updateSocialLinks);

module.exports = router;