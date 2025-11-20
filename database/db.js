const mongoose = require('mongoose');

const connectTodatabase = async() => {
  try{

    await mongoose.connect(process.env.mongoConn);
    console.log('database connection successful');

  } catch(error) {
    console.log('Error while connecting to databse', error);
  }
}

module.exports = connectTodatabase;