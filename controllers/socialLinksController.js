const { socialLinksModel } = require('../models/socialLinksModel');

const socialLinksController = {
  
  // @desc Get All Info
  // @Route GET /api/v1/socialLinks
  // @access public
  async getSocialLinks (req, res) {
    try {
      const result = await socialLinksModel.get();
      res.status(200).json({ message: 'Social Links are fetched successfully!', result });
    } catch (err) {
      console.error('Error while getting Soical links: ', err);
      res.status(500).json({ message: 'Error while getting Soical links: ' + err.message });
    } 
  },

  // @desc Update SocialLinks
  // @route PUT /api/v1/socialLinks
  // @access private
  async updateSocialLinks (req, res) {
    try {
      const data = req.body;
      const result = await socialLinksModel.update(data); 
      res.status(201).json({ message: 'Social links are updated successfully!', result })
    } catch (err) {
      console.error('Error while updating Social links: ', err);
      res.status(500).json({ message: 'Error while updating Social links: ' + err.message })
    }
  }
}

module.exports = socialLinksController;