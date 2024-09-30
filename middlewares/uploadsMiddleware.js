const multer = require('multer');
const path = require('path');
const fs = require('fs');

// types: products, profiles, banners

const pathConfig = {
  allowedFormats: ['image/png', 'image/jpeg', 'image/webp'],
  allowedTypes: ['products', 'profiles', 'banners'],
  uploadPath: path.join(__dirname, '../uploads', 'images'),
  type: (req) => req.params.type,
  id: (req) => req.params.id,
  face: (req) => req.params.face || 'front',  
  color: (req) => req.params.color || 'default',
  extension: (file) => path.extname(file.originalname)
}

const storage = multer.diskStorage({
  destination (req, file, cb) {
    return console.log(file)
   const isTypeAllowed = pathConfig.allowedTypes.some(item => item === pathConfig.type(req));
   if (!isTypeAllowed) return cb(new Error('Invalid upload type.'));

    // const getPath = ({ uploadPath, type, id }) => {
      // const folderTypePath = path.join(uploadPath, type(req));
      // const folderIdPath = path.join(folderTypePath, id(req));
      // return type(req) === 'products' ? folderIdPath : folderTypePath;
    // };

    try {
      fs.mkdirSync(getPath(pathConfig), { recursive: true });
    } catch (err) {
      console.error('Error while creating directories: ', err);
      return cb(new Error ('Unable to create upload directories.'));
    }

    cb(null, getPath(pathConfig));
  },
  filename (req, file, cb) {

    // const getName = ({ type, id, face, color, extension }) => {
      // if (type(req) === 'products') return `${face(req)}_${color(req)}${extension(file)}`;
      // if (type(req) === 'profiles' || type(req)  === 'banners') return `${id(req)}${extension(file)}`;
    // }

    // if (!pathConfig.allowedFormats.includes(file.mimetype)) return cb(new Error ('Invalid file Type'));

    cb(null, getName(pathConfig));
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