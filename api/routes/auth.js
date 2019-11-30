const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { authenticate } = require('./../middleware/authenticate.js');
const {mongoose} = require('./../mongoose/mongoose-connect');
const {userModel} = require('../models/userModel.js');


//Router to signup an new  into the database and send a verification email to the user email id
router.post('/signup',async (request,response)=>{
   
    try{
        
       console.log(request.body);
        var newUser = new userModel(
            request.body
        ); 
        
        newUser.save().then((res) => {
            
            return newUser.generateAuthToken();                                                  //calling function to generate an user token 
        }).then((token_recieved) => {
            // 
            //token received from function called into the userModel
            response.setHeader('x-auth',token_recieved);
            response.status(200).send(newUser);
            newUser.save();
            
            
        })
       
    }
    catch(e){
        
        response.status(400).send('Error Registering User');
    }
       
});



//ROuter to login an user which is already present into the database
router.post('/login', async (request, response) => {
    try{
        var user = await userModel.findByCredentials(request.body.email, request.body.password);
        if (!user) {                                                                       //if user not present in the database
            return response.status(400).send('No Such User Found');
        }
            var token=user.generateAuthToken();
                response.header('x-auth', token).send(user);
    } catch(e){
        response.status(400).send('Error Logging in!');
    }
});

//Router delete an token whenever a user logout 
router.delete('/logout', authenticate, async (request, response) => {
   try{                                            //if user wants to logout then token is removed 
       response.status(200).send('You have been logged out succesfully!');
   }catch(e){
       response.status(400).send('Error Logging Out!');
   }
});

module.exports = router;