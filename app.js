const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const config = require('./utils/config');
const blogRouter = require('./controllers/blog')
const logger = require('./utils/logger');
const middleWare = require('./utils/middleware');
const userRouter = require('./controllers/user');

const app = express();

logger.info('connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI)
.then((response)=>{
  logger.info("Succefully connected ...");
}).catch(err => logger.error("something went wrong...!!", err));


app.use(cors());
//app.use(express.static('dist'));
app.use(express.json())
// app.use(middleWare.requestLogger);
app.use('/api/blogs',blogRouter);
app.use('/api/users',userRouter);
app.use(middleWare.unknownEndpoint);
app.use(middleWare.errorHandler);

module.exports = app;