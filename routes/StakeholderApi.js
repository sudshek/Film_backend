var mongoose=require('mongoose');
var cors=require('cors');
var app=require('express')();
var BodyParser=require('body-parser');
StakeHolder=require('../models/StakeholderModel.js');

mongoose.Promise=global.Promise;
app.use(cors());
app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());

app.post('/newStakeholder',(req,res) => {
      StakeHolder.addStakeHolder(req,res);
});

app.post('/changePassword', (req, res)=>{
    StakeHolder.changePassword(req, res);
});

app.post('/login',(req,res)=>{
    StakeHolder.login(req.body.email,req.body.password,res);
});

module.exports = app;