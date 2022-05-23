const express = require('express');
const app = express();
const router = require('./route');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"));


app.use(express.json());
app.use(cors());
app.use('/api', router);
app.listen(6000, () => {
    console.log('server is up and running on port 6000')
});