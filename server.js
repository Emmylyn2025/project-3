require('dotenv').config();
const express = require('express');
const connectTodatabase = require('./database/db');
const router = require('./routes/route');

const app = express();

//Connect to database
connectTodatabase();

//Middleware
app.use(express.json());
app.use('/api/sorting', router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is now running at ${PORT}`)
});