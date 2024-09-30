const sharp = require('sharp');

const uploadsController = {
  async Type (req, res) {

    try {
      // const filePath = req.file.path;
      // sharp(filePath).toFormat('webp').toFile(filePath);

      if (!req.file) throw new Error ('No file uploaded');
      res.status(201).json({ message: 'File uploaded successfully', file: req.file });
    } catch (err) {
      console.error('Error during file upload: ', err);
      res.status(400).json({ message: err.message });
    }
  },
}

module.exports = uploadsController;
