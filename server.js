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

require("./app/routes/user.routes")(app);
require("./app/routes/likes.routes")(app);

app.listen(3000,()=>{
    console.log("server is running");
    
});