module.exports=app => {
    const users= require("../controllers/user.controller.js");

    //Create a new user
    app.post("/users",users.create);


    //Sign in
    app.get("/users/:userId",users.findOne);

    //edit account details
    app.put("/users/:userId",users.update);
    
};