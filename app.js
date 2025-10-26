const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const config = require('./utils/config');
const blogRouter = require('./controllers/blog')
const{info, error} = require('./utils/logger');

const app = express();

app.use(cors());
app.use(express.json())
app.use('/api/blogs',blogRouter);

info('connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
.then((response)=>{
  info("Succefully connected ...");
}).catch(err => error("something went wrong...!!"));


module.exports = app;