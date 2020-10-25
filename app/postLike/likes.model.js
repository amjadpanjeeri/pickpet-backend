const sql = require("../models/db");

// constructor
const Like = function (like) {
  this.post_id = like.post_id;
  this.user_id = like.user_id;
};

//for liking a post
Like.create = (newLike, result) => {
  sql.query("INSERT INTO liked_posts SET ?", newLike, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Liked Post: ", {
      user_id: res.insertId,
      ...newLike,
    });
    result(null, res);
  });
};

//for disliking
Like.remove = (post_id, user_id, result) => {
  sql.query(
    "DELETE FROM liked_posts WHERE post_id = ? and user_id = ?",
    [post_id, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found follower with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("disliked post with id: ", post_id);
      result(null, res);
    }
  );
};


//a post liked or not
Like.checkLike = (post_id,user_id, result) => {
    sql.query("SELECT * FROM liked_posts WHERE post_id = ? and user_id = ?", [post_id,user_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`post is liked by = ${user_id} \n`, res);
      result(null, res);
      // return;
    });
  };

  Like.likeCount = (post_id, result) => {
    sql.query("SELECT COUNT(*) as count FROM liked_posts WHERE post_id = ?", [post_id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`Like count of ${post_id} is\n`, res);
      result(null, res);
      // return;
    });
  };


  module.exports = Like;
