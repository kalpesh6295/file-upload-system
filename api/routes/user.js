const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { authenticate } = require('./../middleware/authenticate.js');
const {mongoose} = require('./../mongoose/mongoose-connect');
const {userModel} = require('../models/userModel.js');



router.get('/getAllFiles',async(request,response)=>{
var users = await userModel.find({},{file:1,_id:0});
temp=[];
users.forEach(user=>{

user.file.forEach(file=>{
    if(file.publiclyAvailable){
        temp.push(file.url);
    }
})
})
response.status(200).send(temp);
})


router.get('/myfile',authenticate,async(request,response)=>{
    var files = await userModel.findById(request.user._id,{file:1,_id:0});
    response.status(200).send(files.file);
})

router.patch('/file/private/:id',authenticate,async(request,response)=>{
    var id = request.params.id;
    var user = await userModel.updateOne({"_id":request.user._id,"file._id":id},{ $set: { "file.$.publiclyAvailable" : false}})
    response.status(200).send(user);
})



router.patch('/file/public/:id',authenticate,async(request,response)=>{
    var id = request.params.id;
    var user = await userModel.updateOne({"_id":request.user._id,"file._id":id},{ $set: { "file.$.publiclyAvailable" : true}})
    response.status(200).send(user);
})

router.delete('/file/:id',authenticate,async(request,response)=>{
    var id = request.params.id;
    var user = await userModel.updateOne({"_id":request.user._id},{$pull:{file:{_id:id}}});
    response.status(200).send(user);
})



module.exports = router;