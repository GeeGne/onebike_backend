const db = require('../config/db');
const { sequelize, DataTypes } = require('../config/sequelize');

const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  title_en: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  title_ar: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, 
  discount: {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  face: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultvalue:'front'
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  } 
},{
  tableName: 'Products'
});


const productsModel = {
  async getAll () {
    try {
      const sql = 'SELECT * FROM Products';

      const [products] = await db.execute(sql);
      if (!products) throw new Error ('Failed to fetch products');

      return products.map(product => ({ ...product, id: String(product.id) }));
    } catch (err) {
      throw err;
    }
  },
  async get (id) {
    try {
      const sql = 'SELECT * FROM Products WHERE id = ?'

      const product = await db.execute(sql, [id]);
      if (!product) throw new Error('Unable to get the product');

      return product;
    } catch (err) {
      throw err;
    }
    
  },
  async create (product) {
    try {
      const {category, type, title_en, title_ar, price, discount, state, face, color, brand} = product
      const sql = 'INSERT INTO Products (category, type, title_en, title_ar, price, discount, state, face, color, brand) VALUES (?, ? ,?, ?, ? ,?, ?, ? ,?, ?)';

      const [result] = await db.execute(sql, [category, type, title_en, title_ar, price, discount, state, face, color, brand])
      if (result.affectedRows === 0) throw new Error ('Unable to create a record');

      console.log('new product', result.insertId);
      return result.insertId;
    } catch (err) {
      throw err;
    }
  },
  async update (data) {
    try {
      const sql = 'UPDATE Products SET category = ?, type = ?, title_en = ?, title_ar = ?, price = ?, discount = ?, state = ?, face = ?, color = ?, brand = ? WHERE id = ?';
      const { category, type, title_en, title_ar, price, discount, state, face, color, brand, id } = data;

      const [result] = await db.execute(sql, [category, type, title_en, title_ar, price, discount, state, face, color, brand, id]);
      if (result.affectedRows === 0) throw new Error ('No record found with the given ID');
  
      return result;
    } catch (err) {
      throw err;
    }
  },
  async delete (id) {
    try {
      const sql = 'DELETE FROM Products WHERE id = ?';

      const [result] = await db.execute(sql, [id]);
      if (result.affectedRows === 0) throw new Error ('No record found with the given ID');

      return result;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = productsModel;