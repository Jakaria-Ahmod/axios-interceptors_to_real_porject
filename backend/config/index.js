const mongoose = require('mongoose');

const DBCONNECT = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log('db is connect sucessfully');
      })
      .catch(() => {
        console.log('db is not connect ');
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DBCONNECT;
