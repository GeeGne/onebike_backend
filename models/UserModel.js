const db = require('../config/db');
const bcrypt = require('bcrypt');
const { sequelize, DataTypes } = require('../config/sequelize');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_details: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  second_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'owner'),
    allowNull: false,
    defaultValue: 'user'
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
  tableName: 'Users'
});

class User  {
  constructor (
    id,
    fullName,
    email,
    passwordHash,
    phone,
    addressDetails,
    secondAddress,
    notes,
    role,
    city,
    createdAt,
    lastLogin,
    isActive
  ) {
    this.id = id;
    this.full_name = fullName;
    this.email = email;
    this.password_hash = passwordHash;
    this.phone = phone;
    this.address_details = addressDetails;
    this.second_address = secondAddress;
    this.notes = notes;
    this.role = role;
    this.city = city;
    this.created_at = createdAt;
    this.last_login = lastLogin;
    this.is_active = isActive;
  }

  static async getAll () {
    try {
      const sql = 'SELECT * FROM Users';
      const [result] = await db.query(sql);
      return result;  
    } catch (err) {
      console.error('Error: unable to Fetch Users: ', err);
      throw new Error('unable to fetch users: ' + err.message);
    }
  }

  static async create (name, email, passwordHash, phone) {
    try {
      const sql = 
      'INSERT INTO Users (full_name, email, password_hash, phone) VALUES (?, ?, ? ,?)';
      const [result] = await db.query(sql, [name, email, passwordHash, phone]);
      if (!result.affectedRows === 0) throw new Error ('User wasn\'t created');
      
      return result;    
    } catch (err) {
      console.error('Error: unable to create new user: ', err)
      throw new Error('Error creating user:' + err.message)
    }
  }

  static async signIn ({email, password}) {
    try {

      const user = await this.getByEmail(email);
      if (!user) throw new Error('Invalid email or password');

      const storedHash = user.password_hash;
      const verifyPassword = await bcrypt.compare(password, storedHash);
      if (!verifyPassword) throw new Error('Invalid email or password');

      return this.sanatizeUser(user);
    } catch (err) {
      console.error('coudln\'t verify user: ', err);
      throw err;
    }
  }

  static async getByEmail (email) {
    try {
      const sql = 'SELECT * FROM Users WHERE email = ?';
      const [[getUser]] = await db.query(sql, [email]);
      if (!getUser) throw new Error('Invalid email or password');

      return getUser;
    } catch (err) {
      console.error('couldn\'t get user: ', err);
      throw err;
    }
  }

  static async getById (id) {
    try {
      const sql = 'SELECT * FROM Users WHERE id = ?';
      const [[getUser]] = await db.query(sql, [id]);
      if (!getUser) throw new Error('Invalid email or password');

      return this.sanatizeUser(getUser);
    } catch (err) {
      console.error('couldn\'t get user: ', err);
      throw new Error ('counldn\'t get user: ' + err.message)
    }

  }

  static async updateProfile ({id, full_name, phone, address_details, second_address, notes}) {
    try {
      const sql = 
      'UPDATE Users SET full_name = ?, phone = ?, address_details = ?, second_address = ?, notes = ?  WHERE id = ?';

      const [result] = await db.query(sql, [full_name, phone, address_details, second_address, notes, id])
      if (!result.affectedRows === 0) throw new Error ('failed to update');

      return result;
    } catch (err) {
      console.error('Error while updating user info: ', err.message);
      throw new Error ('Error while updating user info: ' + err.message)
    }
  }

  static sanatizeUser (user) {
    const {id, full_name, phone, email, role, address_details, second_address, notes, is_active} = user;
    return {id: String(id), full_name, phone, email, role, address_details, second_address, notes, is_active};
  }
}

module.exports = { User, Users };