const {userModel} = require('./../models/userModel.js');
const jwt = require('jsonwebtoken');
//Authenticate is used to verify the user is valid.if valid then give access to the user
var authenticate = (request,response,next) =>{
    var token = request.header('x-auth');      //Checking the header if token is present
    // console.log(token);
    var decodedtoken=jwt.decode(token);
    // console.log('Decoded Token-->',decodedtoken);
    userModel.findById({_id:decodedtoken._id}).then((user)=>{
        if(!user){
            return Promise.reject();           //if token is not matched into the user database return the error
        }
        request.user = user;    
        // // console.log(user);               //if user is present into the database return send userName
        next();
    }).catch((e)=>{
        response.status(401).send('User may not be registered or check x-auth token');         
    });
};

module.exports = {authenticate};
