const productsModel = require('../models/ProductsModel');

// @desc Fetch all products
// @route GET /api/products
// @access Public

const productsController = {

  // @desc Fetch all products
  // @route GET /api/v1/products
  // @access Public
  async getAll (req, res) {
    try {
      const products = await productsModel.getAll();
      if (!products) throw new Error ('Failed to fetch products');

      res.status(200).json({ products, message: 'Products are fetched successfully!' });
    } catch (err) {
      console.error('Error while fetching products: ', err);
      res.status(500).json({ message: 'Error while fetching products: ' + err.message });
    }
  },

  // @desc create new product
  // @route POST api/v1/products
  // @access private
  async newProduct (req, res) {
    try {
      const newProduct = req.body;

      const productId = await productsModel.create(newProduct);
      if (!productId) throw new Error ('Failed to create new product');

      res.status(201).json({ productId, message: 'New product is created successfully!'})
    } catch (err) {
      console.error('Unable to create new product: ', err);
      res.status(404). json({ message: 'Unable to create new product: ' + err.message });
    }
  },

  // @desc update existed product
  // @route POST api/v1/products/:id
  // @access private
  async updateProduct (req, res) {
    try {
      const productData = req.body;
      const { id } = req.params;

      const updatedProduct = await productsModel.update({...productData, id});

      res.status(200).json({ message: 'Product updated successfully', updatedProduct})
    } catch (err) {
      console.error('Error while updating product: ', err);
      res.status(500).json({ message: 'Error while updating product: ' + err.message })
    }
  },

  // @desc Delete a product
  // @route DELETE /api/v1/products/:id
  // @access private
  async deleteProduct (req, res) {
    try {
      const { id } = req.params

      const result = await productsModel.delete(id);

      res.status(200).json({ message: 'Product deleted successfully!', result })
    } catch (err) {
      console.error('Error while deleteing product: ', err)
      res.status(400).json({ message: 'Error while deleteing product: ' + err.message })
    }
  }
};

module.exports = productsController;