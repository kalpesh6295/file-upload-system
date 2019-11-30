const express = require('express');
const bodyParser = require('body-parser');
var helmet = require('helmet')
const path = require('path');
const multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();


var authRouter = require('./routes/auth.js');
var fileuploadRouter=require('./routes/fileUpload.js');
var userRouter = require('./routes/user.js');
var app = express();


//middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(multipartyMiddleware);
app.use((req, res, next) => {
  // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
   // Request methods you wish to allow
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,PATCH,DELETE");
   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Boundary,Access-Control-Request-Method, Access-Control-Request-Headers,x-auth");
   res.setHeader("Access-Control-Expose-Headers", "x-auth");
   // Pass to next layer of middleware
   next();
});


//Routes
app.use('/api/auth',authRouter);      //new signup and login route
app.use('/api/fileUpload',fileuploadRouter); // route for file uploading  
app.use('/api/user',userRouter)

//server listening
app.listen(process.env.PORT||8080,(status)=>{
    if(process.env.PORT){
      console.log('Server up on the port '+process.env.PORT);
    }else{
      console.log('Server up on the port '+8080);
    }
})