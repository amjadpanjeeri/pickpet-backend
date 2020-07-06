module.exports=app => {
    const posts=require("../controllers/posts.controller");

    //create a post
    app.post("/post",posts.create);
}