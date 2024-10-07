const db = require('../config/db');

const socialLinksModel = {
  async get () {
    try {
      const sql = `
        SELECT * FROM SocialLinks where id = 1
      `;

      const [[result]] = await db.execute(sql); 
      if (result.affectedRows === 0 ) throw new Error ('Invalid format or connection error');

      return result;
    } catch (err) {
      throw err;
    }
  },
  async update ({ email, phone, facebook, instagram, whatsApp }) {
    try {
      const sql = `
        UPDATE SocialLinks 
        SET email = ?, phone = ?, facebook = ?, instagram = ?, whatsApp = ?
        where id = 1;
      `;

      const [result] = await db.execute(sql, [email, phone, facebook, instagram, whatsApp])

      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = socialLinksModel;