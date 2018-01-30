var mongoose = require('mongoose');
var app = require('express')();
var cors = require('cors');
mongoose.Promise = global.Promise;
var BodyParser = require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
User = require('../models/UserModel.js');

app.get('/myProducts/',(req,res)=>{
    User.getMyProducts(req,res);
});
app.post('/changePassword/', (req, res)=>{
    User.changePassword(req, res);
});

module.exports = app;
