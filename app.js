const express=require('express');
const app=new express();

const router=require('./src/Router/api');
const mongoose=require('mongoose');
const bodyParser=require("body-parser");

const path=require('path');

//security middleare

const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const hpp =require('hpp');
const cors =require('cors');
const xss =require('xss-clean');

//Database Lib Import

// app.use(express.static('client/build'));

//security Middleware Implement
app.use(cors())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(helmet());

const limiter=rateLimit({
    windowMs:15*60*1000,max:3000
})
app.use(limiter);

const url="mongodb+srv://<username>:<password>@cluster0.75qh3yi.mongodb.net/BusinessTable?retryWrites=true&w=majority";
const option={
    user:'rakib107054',
    pass:'rakib172561',
    autoIndex:true
}
mongoose.connect(url,option).then(()=>{
    console.log("Database connection sucessfull");
}).catch((e)=>{
    console.log(e)
})




app.use('/api/v1',router);

app.use(express.static('client/dist'));
app.get('*',function(req,res){
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})



module.exports=app;