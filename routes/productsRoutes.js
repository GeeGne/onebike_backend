const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { checkAuth, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(productsController.getAll)
  .post(checkAuth, admin, productsController.newProduct);

router.route('/:id')
  .put(checkAuth, admin, productsController.updateProduct)
  .delete(checkAuth, admin, productsController.deleteProduct);

module.exports = router;


