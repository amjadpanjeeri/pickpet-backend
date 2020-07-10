
module.exports = app => {
    const posts = require("./posts.controllers");
    
    //Create a new user
    app.post("/posts", posts.create);

    //getting all posts by a given user
    app.get("/posts/:user_id", posts.findAll);

    //getting posts of all users
    app.get("/posts", posts.findAll);

    //updating like count
    app.put("/posts/:post_id", posts.update);


};