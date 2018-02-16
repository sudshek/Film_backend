var mongoose=require('mongoose');
var app=require('express')();
var cors=require('cors');
mongoose.Promise=global.Promise;
var BodyParser=require('body-parser');
app.use(cors());
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
Form=require('../models/FormModel.js');

app.post('/step1',(req,res) => {
    Form.step1(req,res);
});

app.post('/step2',(req,res) =>{
    Form.step2(req,res);
});

module.exports = app;