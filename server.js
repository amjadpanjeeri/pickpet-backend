const express=require("express");
const bodyparser=require("body-parser");

const app=express();

// parse requests of content-type: application/json
app.use(bodyparser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}));

//simple route
app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to pickpet"
    });
});

app.listen(3000,()=>{
    console.log("server is running");
    
});