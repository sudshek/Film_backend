var mongoose=require('mongoose');
var app=require('express')();
var cors=require('cors');
var bcrypt=require('bcrypt');
var salt=bcrypt.genSaltSync(10);
var BodyParser=require('body-parser');
var port=8080;
var Schema=mongoose.Schema;

// var nodemailer=require('nodemailer');

// var transporter=nodemailer.createTransport(
//     {
//         service: 'gmail',
//         auth :{
//             user:'exchangerapp123@gmail.com',
//             pass: 'sudhanshu123'
//         }
//     }
// );

// var mailOptions={
//     from:'exchangerapp123@gmail.com',
//     to: '',
//     subject: 'Verification Code',
//     text : 'Your code is'
// };

var StakeholderSchema = new Schema(
    {
        name:{type:String, required:true},
        stakeholderId:{type:String},
        email:{type:String, required:true},
        password:{type:String, required:true},
        location :[{type: String}]
    }
); 

var myObj ={
     success:true,
     error:"",
     stakeholderId: ""
};
const Stakeholder=mongoose.model('Stakeholder',StakeholderSchema);


app.use(cors());
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

const addStakeHolder= function(req,res){
    var query=Stakeholder.findOne({email: req.body.email },function (err,stakeholder){
        if(err) throw err;
        else{
            console.log("hello this is stakehlder");

            if(stakeholder!=null){
                myObj.success=false;
                myObj.error="This Stakeholder Email is already registered";
                res.send(myObj);
            }else{
                
                newStakeholder=new Stakeholder(req.body);
                var hash=bcrypt.hashSync(req.body.password,salt);
                newStakeholder.password=hash;
                newStakeholder.save(function (err,doc){
                    if(err) throw err;
                    else{
                        console.log("Stakeholder created");
                        newStakeholder.stakeholderId=doc._id;
                        newStakeholder.save();
                        myObj.success=true;
                        myObj.error="";
                        myObj.stakeholderId=newStakeholder.stakeholderId;
                        res.send(myObj);
                    }
                });

            }
        }
    });
};

const login=function(email,password,res){
    currentStakeholder=Stakeholder.findOne({email:email},function(err,stakeholder){
        if(err) throw err;
        else{
            if(stakeholder==null){
               res.send({success:false,error:"This Email is not registered"});
            }else{
                bcrypt.compare(password,stakeholder.password,function(err,result){
                    if(result==true){
                        res.send({success:true, stakeholderId:stakeholder.stakeholderId, name : stakeholder.name});
                    }else{
                        res.send({success:false,error:"Password doesnot match"});
                    }
                });
            }
        }
    });
}

const changePassword=function(req,res){
    Stakeholder.findOne({stakeholderId : req.body.stakeholderId},function(err,current_stakeHolder){
        bcrypt.compare(req.body.currentPassword,current_stakeHolder.password,function(err,result){
            if(result==true){
                hash=bcrypt.hashSync(req.body.newPassword,salt);
                current_stakeHolder.password=hash;
                res.send({success:true});
                current_stakeHolder.save();
                console.log("password changed");
            }else{
                res.send({success:false});
            }
        });
    });
};

module.exports={
    StakeholderModel : Stakeholder,
    addStakeHolder : addStakeHolder,
    login : login,
    changePassword : changePassword
}