const sharp = require('sharp');
const path = require('path');
const fsPromises = require('fs').promises;
const fs = require('fs');
const pathConfig = require('../config/uploadPathConfig');

const uploadsController = {
  async Type (req, res) {
    const { getPath, getName } = pathConfig;
    try {
      if (!req.file) throw new Error ('No file uploaded');
      // Create Upload path folder
      fs.mkdirSync(getPath(req), { recursive: true });
      
      // Convert temp file to webp and save to the choosen path folder
      const tempPath = req.file.path;
      const outputPath = path.join(getPath(req), getName(req));
      await sharp(tempPath).webp({ quality: 80 }).toFile(outputPath);
      
      // delete the temp file
      console.log('Deleting file:', tempPath);
      await fsPromises.unlink(tempPath)
      
      res.status(201).json({ message: 'File uploaded successfully', file: req.file });
    } catch (err) {
      console.error('Error during file upload: ', err);
      res.status(400).json({ message: err.message });
    }
  },
}

module.exports = uploadsController;
