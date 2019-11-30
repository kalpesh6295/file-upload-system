const env = require('../confing/env');
var mongoose = require('mongoose');

var mongoDB = env.mongoDB;

mongoose.connect(mongoDB, 
    {useNewUrlParser:true}
);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = {mongoose};
