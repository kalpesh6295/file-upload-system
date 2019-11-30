const fs = require('fs');
const express = require('express');
const { authenticate } = require('./../middleware/authenticate.js');
const router = express.Router();
const env = require('./../confing/env.js');
const S3FS = require('s3fs');

const s3fsImpl = new S3FS('elroute-alltype', {                      //AWS Bucket name 
    accessKeyId: env.AWS_ACCESS_KEY_ID,                                 //AWS access key               
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    signatureVersion:'v4'                          //AWS secret key 
});

const {userModel} = require('../models/userModel.js');


//Router used to upload image to every new user 
router.post('/',authenticate,async(request, response) => {
    console.log(request.user);
    for (key in request.files){
       var  myfile= request.files[key];
       var fname = myfile.name;     
       console.log(fname) ;                            //Filename            
    var filename = fname.replace(/\s/g, '');                               //replacing gaps from the user filename  
    myfile.originalFilename = Date.now() + filename;                       //Date is added in front of the filename to remove conflict                           
    const awsurl = "https://s3.ap-south-1.amazonaws.com/elroute-alltype/";        //predefined aws url is given by the AWS with bucket name
    var stream = fs.createReadStream(myfile.path);
     var upload=await s3fsImpl.writeFile(myfile.originalFilename, stream)
        if(upload)
        {
            try{
            var user = request.user;
            
            var fileObj={
                publiclyAvailable:request.body.accessible, 
                url:awsurl + myfile.originalFilename
            }
            console.log(awsurl)
           var data = await userModel.findByIdAndUpdate(user._id,{
               $push:{
                   file:fileObj
               }
           },{new:true});
        response.status(200).send(data);
    }
    catch(e){
        response.status(400).send(e);
    }

        }
        else{
            response.status(400).send("only upload .jpg and .png file");
        }
    }
    
    
    
});


module.exports = router;