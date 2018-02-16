var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
var app=require('express')();
var cors=require('cors');
var BodyParser=require('body-parser');
var port=8080;
var Schema=mongoose.Schema;

var FormSchema = new Schema(
   {   
       formId:{type:String},
       producerFirstName:{type : String},
       producerLastName:{type : String },
       directorFirstName:{type : String},
       directorLastName:{type : String },
       movieName:{type : String},
       bannerName:{type : String},
       typeOfFilm:{type : String},
       language:{type : String},
       actorName:{type : String},
       actressName:{type : String},
       numberOfCastMembers:{type : String},
       numberOfCrewMembers:{type : String},
       commencementDate:{type : String},
       LocationsOfShooting:[{type : String}],
       DatesOfShooting:[{type : String}],
       timingOfShooting:[{type : String}]
   }
);

const Form=mongoose.model('Form',FormSchema);
app.use(cors());
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

const step1=function(req,res){
    if(req!=undefined && req.body.directorFirstName!=undefined){
        newForm=new Form();
        newForm.save(function(err,form){
            if(err){
                throw err;
            }else{
                form.formId=form._id;
                form.producerFirstName=req.body.producerFirstName;
                form.producerLastName=req.body.producerLastName;
                form.directorFirstName=req.body.directorFirstName;
                form.directorLastName=req.body.directorLastName;
                form.movieName=req.body.movieName;
                form.typeOfFilm=req.body.typeOfFilm;
                form.language=req.body.language;
                form.actorName=req.body.actorName;
                form.actressName=req.body.actressName;
                form.bannerName=req.body.bannerName;
                form.save();
                res.send({success:true ,formId:form._id});
            }
        });
    }else{
        // if(req==undefined){
        //     console.log("req is undefines");
        // }
        res.send({success:false ,error:"Not a valid request"});
    }
 
};

const step2=function(req,res){
    if(req!=undefined&&req.body.formId!=undefined){
             Form.findOne({formId:req.body.formId},function(err,currentForm){
                 if(err){
                     throw err;
                 }else{
                     currentForm.numberOfCastMembers=req.body.numberOfCastMembers;
                     currentForm.numberOfCrewMembers=req.body.numberOfCrewMembers;
                     currentForm.commencementDate=req.body.commencementDate;
                     currentForm.LocationsOfShooting=req.body.LocationsOfShooting;
                     currentForm.DatesOfShooting=req.body.DatesOfShooting;
                     currentForm.timingOfShooting=req.body.timingOfShooting;
                     currentForm.save();
                     res.send({success:true,formId:req.body.formId});
                 }
             });
    }else{
        res.send({success:false ,error:"Not a valid request"});
    }
}

module.exports={
    FormModel:Form,
    step1:step1,
    step2:step2
}