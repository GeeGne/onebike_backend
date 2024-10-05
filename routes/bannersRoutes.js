const express = require('express');
const router = express.Router();
const bannersController = require('../controllers/bannersController');
const { checkAuth, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(bannersController.getBanners)
  .post(checkAuth, admin, bannersController.createBanner)
  .put(checkAuth, admin, bannersController.updateBannerOrders);

router.route('/:id')
  .put(checkAuth, admin, bannersController.updateBannerAlt)
  .delete(checkAuth, admin, bannersController.deleteBanner);

module.exports = router;