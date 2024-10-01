const path = require('path');

// types: products, profiles, banners

const pathConfig = {
  allowedFormats: ['image/png', 'image/jpeg', 'image/webp'],
  allowedTypes: ['products', 'profiles', 'banners'],
  uploadPath: path.join(__dirname, '../uploads', 'images'),
  tempPath: path.join(__dirname, '../uploads', 'bin'),
  type: (req) => req.params.type,
  id: (req) => req.params.id,
  face: (req) => req.params.face || 'front',  
  color: (req) => req.params.color || 'default',
  extension: (file) => path.extname(file.originalname),
  getPath (req) {
    const folderTypePath = path.join(pathConfig.uploadPath, pathConfig.type(req));
    const folderIdPath = path.join(folderTypePath, pathConfig.id(req));
    return pathConfig.type(req) === 'products' ? folderIdPath : folderTypePath;
  },
  getName (req) {
    if (pathConfig.type(req) === 'products') return `${pathConfig.face(req)}_${pathConfig.color(req)}.webp`;
    if (pathConfig.type(req) === 'profiles' || pathConfig.type(req)  === 'banners') return `${pathConfig.id(req)}.webp`;
  }
}

module.exports = pathConfig;