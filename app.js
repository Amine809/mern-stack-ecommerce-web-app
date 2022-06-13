const express=require('express');
const app=express();
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors')
const expressValidator=require('express-validator');
//import routes
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const braintreeRoutes=require("./routes/braintree")
const orderRoutes=require("./routes/order")


mongoose.connect(process.env.CONNECTION_STRING,
    {useUnifiedTopology: true, useNewUrlParser: true ,useCreateIndex: true}
    )
.then(()=>{
    console.log('database connection is ready')
})
.catch((err)=>{
    console.log(err)
 })

 

/*
mongoose.connect(process.env.MONGODB)
.then(()=>console.log("connected to mongodb..."))
.catch(()=>console.error("could not connect to mongodb"))

*/

//set config
require('dotenv').config()
//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//first route
app.get('/',(req,res)=>{
    res.send("this my first heroku app guy")
})
//hello world 
app.get('/api',(req,res)=>{
    res.send("hello world 1")
})
//routes middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',braintreeRoutes);
app.use('/api',orderRoutes);

const port =process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`server start at port ${port}`);
})