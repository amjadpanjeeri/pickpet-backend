const sql = require("../models/db");

// constructor

const Post = function (post) {
    this.user_id = post.user_id;
    this.post_name = post.post_name;
    this.post_category = post.post_category;
    this.post_description = post.post_description;
    this.post_date = post.post_date;
    this.place = post.place;
    this.contact_number = post.contact_number;
    this.price = post.price;
    this.likes = post.likes;
};


//creating new post
Post.create = (newPost, result) => {
    sql.query("INSERT INTO post_table SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Post: ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};


//retrieving all posts of a given user
Post.getAll = (user_id, result) => {
    sql.query("SELECT * FROM post_table WHERE user_id = ?",
        [user_id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log(`post of user with user_id = ${user_id} \n`, res);
            // result(null,res);
        });
};


//retrieving all posts of a given user
Post.getAll = (result) => {
    sql.query("SELECT * FROM post_table",
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log(`all posts in the database\n`, res);
            result(null, res);
        });
};


//updating post
Post.updateById = (post_id, post, result) => {
    sql.query(
        "UPDATE post_table SET post_name = ? , post_category = ? , post_description = ? , post_date = ? , place = ? , contact_number = ? , price = ? WHERE post_id = ?",
        [post.post_name, post.post_category, post.post_description, post.post_date, post.place, post.contact_number, post.price],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found post with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated post: ", { result });
            result(null, { id: post_id });
        }
    );
};


//updating like count
Post.updateById = (post_id, result) => {
    sql.query(
        "UPDATE post_table SET likes = likes+1 WHERE post_id = ?",
        [post_id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found post with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated post: ", { id: post_id });
            result({ result }, null)
        }
    );


};


module.exports = Post;
