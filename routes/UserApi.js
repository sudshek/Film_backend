var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
User = require('../models/UserModel.js');

app.post('/newUser',(req,res) => {
   User.addData(req,res);
});

app.post('/verify',(req,res)=>{
User.verify(req.body.email, req.body.verificationcode,res);
});

app.post('/changePassword', (req, res)=>{
    User.changePassword(req, res);
});

app.post('/login',(req,res)=>{
    User.Login(req.body.email,req.body.password,res);
});

module.exports = app;
