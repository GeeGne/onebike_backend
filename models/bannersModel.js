const db = require('../config/db');
const { sequelize, DataTypes } = require('../config/sequelize');

const Banners = sequelize.define('Banners', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  alt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
  tableName: 'Banners',
  timestamps: false
});

const bannersModel = {
  async getAll () {
    try {
      const sql = 'SELECT * FROM Banners ORDER BY `order` ASC';

      const [banners] = await db.execute(sql);
      if (!banners) throw new Error ('Failed to retrieve from database')

      return banners 
    } catch (err) {
      throw err;
    }
  },
  async get () {
    try {

    } catch (err) {
      throw err;
    }
  },
  async create (order) {
    try {
      const sql = `
        INSERT INTO Banners (\`order\`)
        VALUES (?)
      `;

      const [result] = await db.execute(sql, [order]);
      if (result.affectedRows === 0) throw new Error ('Failed to create new banner.');

      return result;
    } catch (err) {
      throw err;
    }
  },
  async updateRecords (banners) {
    try {
      // const sql = `INSERT INTO Banners (id, alt, \`order\`) VALUES ? ON DUPLICATE KEY UPDATE \`order\` = VALUES(\`order\`)`;
      const sql = `
        INSERT INTO Banners (id, alt, \`order\`) 
        VALUES ${banners.map(() => '(?, ?, ?)').join(', ')}
        ON DUPLICATE KEY UPDATE 
        \`order\` = VALUES(\`order\`)
      `;

      const values = banners.flat();
      const [result] = await db.execute(sql, values);
      
      return result
    } catch (err) {
      throw err;
    }
  },
  async updateAlt ({ alt, id }) {
    try {
      const sql = `
        UPDATE Banners 
        SET alt = ?
        WHERE id = ?
      `;

      const [result] = await db.execute(sql, [alt, id]);
      if (result.affectedRows === 0) throw new Error ('Couldn\'t update the banner alt.')

      return result;
    } catch (err) {
      throw err;
    }
  },
  async delete (id) {
    try {
      const sql = `
        DELETE FROM Banners WHERE id = ?      
      `;

      const [result] = await db.execute(sql, [id]);
      if (result.affectedRows === 0) throw new Error ('Record doesn\'t exist or bad request.');

      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = bannersModel;