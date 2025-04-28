if(process.env.NODE_ENV!="production"){
    require("dotenv").config()
  }




const express = require("express");
const connectToDb=require('./db/db');
const cookieParser=require('cookie-parser')
const app=express()
let port=8080
const userRoutes=require('./routes/user.routes');
const cors=require('cors')

connectToDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());


app.use('/api/v1/user',userRoutes);
app.get('/',(req,res)=>{
res.send('Hello world');
});

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
});




