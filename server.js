const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const app = express();

// import Routes
const userRoutes = require('./routes/userRoutes');
const uploadsRoutes = require('./routes/uploadsRoutes');
const productsRoutes = require('./routes/productsRoutes');
const bannersRoutes = require('./routes/bannersRoutes');
const socialLinksRoutes = require('./routes/socialLinksRoutes');

// app.use(cors({ origin: 'http://192.168.1.5:5173', credentials: true, optionSuccessStatus: 200 }));
app.use(cors({ origin: process.env.API_HOST, credentials: true, optionSuccessStatus: 200 }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1/uploads', uploadsRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/banners', bannersRoutes);
app.use('/api/v1/socialLinks', socialLinksRoutes);

// uploads direc
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log('Server is running on port : ', port));
