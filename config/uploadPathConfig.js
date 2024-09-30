// types: products, profiles, banners

const pathConfig = {
  allowedFormats: ['image/png', 'image/jpeg', 'image/webp'],
  allowedTypes: ['products', 'profiles', 'banners'],
  uploadPath: path.join(__dirname, '../uploads', 'images'),
  type: (req) => req.params.type,
  id: (req) => req.params.id,
  face: (req) => req.params.face || 'front',  
  color: (req) => req.params.color || 'default',
  extension: (file) => path.extname(file.originalname),
  getPath({ uploadPath, type, id }) {
    const folderTypePath = path.join(uploadPath, this.type(req));
    const folderIdPath = path.join(folderTypePath, this.id(req));
    return this.type(req) === 'products' ? folderIdPath : folderTypePath;
  },
  getName () {
    if (this.type(req) === 'products') return `${this.face(req)}_${this.color(req)}${this.extension(file)}`;
    if (this.type(req) === 'profiles' || this.type(req)  === 'banners') return `${this.id(req)}${this.extension(file)}`;
  }
}

// const getPath = ({ uploadPath, this.type, this.id }) => {
  // const folderTypePath = path.join(uploadPath, type(req));
  // const folderIdPath = path.join(folderTypePath, id(req));
  // return type(req) === 'products' ? folderIdPath : folderTypePath;
// }
// 
// const getName = ({ type, id, face, color, extension }) => {
  // if (type(req) === 'products') return `${face(req)}_${color(req)}${extension(file)}`;
  // if (type(req) === 'profiles' || type(req)  === 'banners') return `${id(req)}${extension(file)}`;
// }