const bannersModel = require('../models/bannersModel');

const bannersController = {
  
  // @desc Get all banners
  // @route GET /api/v1/banners
  // @access public
  async getBanners (req, res) {
    try {
      const banners = await bannersModel.getAll();

      res.status(200).json(banners)
    } catch (err) {
      console.error('Error while fetching banners: ', err);
      res.status(500).json({ message: 'Error while fetching banners: ' + err.message })
    }
  },

  // @desc Create new banner
  // @route POST /api/v1/banners
  // @access private
  async createBanner (req, res) {
    try {
      const { order } = req.body;
      if (!order) return res.status(400).json({ message: 'Error while creating banner: Invalid request format.' })
      const result = await bannersModel.create(order);

      res.status(201).json({ message: 'New banner is created successfully!', result });
    } catch (err) {
      console.error('Error while creating banner: ', err);
      res.status(500).json({ message: 'Error while creating banner: ' + err.message });
    }
  },

  // @desc Update banner records (order)
  // @route PUT /api/v1/banners
  // @access private
  async updateBannerOrders (req, res) {
    try {
      const banners = req.body;
      if (!banners) return res.status(400).json({ message: 'No data in the body request.' })

      const result = await bannersModel.updateRecords(banners);

      res.status(201).json({ message: 'banner orders is updated successfully!', result });
    } catch (err) {
      console.error('Error while updaing banner orders: ', err);
      res.status(500).json({ message: 'Error while updating banner orders: ' + err.message })
    }
  },

  // @desc Update existed banner
  // @route PUT /api/v1/banners/:id
  // @access private
  async updateBannerAlt (req, res) {
    try {
      const { alt } = req.body;
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Invalid format request.'});

      const result = await bannersModel.updateAlt({ alt, id });

      res.status(201).json({ message: 'alt updated successfully!', result });
    } catch (err) {
      console.error('Error updating banner alt: ', err)
      res.status(500).json({ message: 'Error updating banner alt: ' + err.message })
    }
  },

  // @desc delete banner
  // @route DELETE /api/v1/banners/:id
  // @access private
  async deleteBanner (req, res) {
    try {
      const { id } = req.params;

      const result = await bannersModel.delete(id);
      
      res.status(200).json({ message: 'Banner is deleted successfully!', result })
    } catch (err) {
      console.error('Error while deleting banner: ', err);
      res.status(500).json({ message: 'Error while deleting banner: ' + err.message })
    }
  }
}

module.exports = bannersController;