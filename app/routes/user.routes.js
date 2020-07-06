module.exports=app => {
    const users= require("../controllers/user.controller.js");

    //Create a new user
    app.post("/users",users.create);


    //Sign in
    app.get("/users/:userId",users.findOne);

    //Delete a post
    app.delete("/users/:userId",users.delete);

    //update
    app.put("/users/:userId", users.update);

};