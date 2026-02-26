require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3030;
const authRoutes = require('./routes/authRoutes');
const DBCONNECT = require('./config');

///
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://al-hadith-backend.vercel.app'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use('/api/auth', authRoutes);



//
app.listen(PORT, () => {
  DBCONNECT();
  console.log(`server is ruing http://127.0.0.1:${PORT}`);
});
