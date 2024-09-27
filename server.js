const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
app.use(cors({ origin: 'http://localhost:5173', credentials: true, optionSuccessStatus: 200  }));
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1', userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on port : ', port));
