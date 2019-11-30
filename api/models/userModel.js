const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    userName: {
        //It is name of user registering --> NAME in signup Form
        type: String,
        required: true
        
    },
    email: {
        //It is Email of user registering --> NAME in signup Form
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    file:[{
        url:{ 
            type:String
        },
        publiclyAvailable:{
            type:Boolean,
            default:false
        }
    }]
});

userSchema.methods.generateAuthToken = function() {
    //methods is for single particular selected document
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();
    return token;
};



userSchema.statics.findByCredentials = function(email, password) {
    //statics is for all the document inside a collection
    var userModel = this;
    return userModel.findOne({
      email: email
    }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    resolve(user);
                } else {
                    // console.log(error);
                    reject('not found');
                }
            });
        });
    });
};


//Function to find out token is matched into the database with any user 
userSchema.statics.findByToken = function(token){
    var userModel = this;
    var decoded;
    try{
        decoded = jwt.verify(token,'abc123');
    }
    catch(e){
        return Promise.reject("Error Occured");
    }
    return userModel.findOne({
        _id:decoded._id,
        'tokens.token': token,
        'tokens.access':'auth'
    });
};


//Method to Hash the password every time a new user is added 
userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        var password = user.password;
        bcrypt.genSalt(10,(error,salt)=>{
            bcrypt.hash(password,salt,(error,hash)=>{
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
});

var userModel = mongoose.model('user',userSchema);

module.exports = {userModel};
