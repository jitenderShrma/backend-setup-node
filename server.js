const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const api = require('./api');
const db = require('./api/models');

// impliment authenticate
require('./api/middlewares/verifyToken')(passport);

const app = express();
  
// body-parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// use route file
app.use('/api', api);

// global vars
global.db = db;

// Listen to server
const port = process.env.PORT || 4000;

app.listen(port, function(){
  console.log(`server listen at port ${port}`);
});