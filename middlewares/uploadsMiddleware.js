const multer = require('multer');
const path = require('path');
const pathConfig = require('../config/uploadPathConfig.js');

// types: products, profiles, banners

const storage = multer.diskStorage({
  destination (req, file, cb) {
   const isTypeAllowed = pathConfig.allowedTypes.some(item => item === pathConfig.type(req));
   if (!isTypeAllowed) return cb(new Error('Invalid upload type.'));

    cb(null, pathConfig.tempPath);
  },
  filename (req, file, cb) {
    if (!pathConfig.allowedFormats.includes(file.mimetype)) return cb(new Error ('Invalid file Type'));
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { filesize: 5 * 1024 * 1024 }
});


// File filter for image types (you can customize this)
// function fileFilter(req, file, cb) {
  // const fileTypes = /jpeg|jpg|png|gif/;
  // const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // const mimeType = fileTypes.test(file.mimetype);
  // 
  // if (extname && mimeType) {
    // cb(null, true);
  // } else {
    // cb(new Error('Only images are allowed!'));
  // }
// }

module.exports = upload;