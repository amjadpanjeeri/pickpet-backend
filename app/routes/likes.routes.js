module.exports=app => {
    const likes= require("../controllers/likes.controller");

    //Create a new user
    app.post("/post/likes", likes.create);
    
};