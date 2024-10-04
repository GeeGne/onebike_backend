const express = require('express');
const router = express.Router();
const uploadsController = require('../controllers/uploadsController');
const upload = require('../middlewares/uploadsMiddleware')

//Types: products, banners, profiles;

router.route('/:type/:id/:face?/:color?')
  .post(upload.single('file'), uploadsController.type);


module.exports = router;