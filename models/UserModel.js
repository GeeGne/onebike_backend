const db = require('../config/db');
const bcrypt = require('bcrypt');

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
      throw new Error('unable to fetch users');
    }
  }

  static async create (fullName, email, passwordHash, phone) {
    try {
      const sql = 
      'INSERT INTO Users (full_name, email, password_hash, phone) VALUES (?, ?, ? ,?)';
      const [result] = await db.query(sql, [fullName, email, passwordHash, phone]);
  
      const [newUser] = await db.query('SELECT * FROM Users WHERE id = ?', result.insertId);
      return newUser;
    } catch (err) {
      console.error('Error: unable to create new user: ', err)
      throw new Error('Error creating user')
    }
  }

  static async signIn ({email, password}) {
    try {

      const sql = 'SELECT * FROM Users WHERE email = ?';
      const [[getUser]] = await db.query(sql, [email]);
      if (!getUser) throw new Error('Invalid email or password');

      const storedHash = getUser.password_hash;
      const verifyPassword = await bcrypt.compare(password, storedHash);
      if (!verifyPassword) throw new Error('Invalid email or password');

      return this.sanatizeUser(getUser);
    } catch (err) {
      console.error('coudln\'t verify user: ', err);
      throw new Error ('Error verifying user: ' + err.message);
    }
  }

  static sanatizeUser (user) {
    const {id, full_name, email, role, is_active} = user;
    return {id, full_name, email, role, is_active};
  }
}

module.exports = User;