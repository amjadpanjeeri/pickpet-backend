const sql = require("../models/db");

// constructor
const AccessoryLike = function (like) {
  this.post_id = like.post_id;
  this.user_id = like.user_id;
};

//for liking a accessory
AccessoryLike.create = (newLike, result) => {
  sql.query("INSERT INTO pet_accessories_likes SET ?", newLike, (err, res) => {
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
AccessoryLike.remove = (post_id, user_id, result) => {
  sql.query(
    "DELETE FROM pet_accessories_likes WHERE post_id = ? and user_id = ?",
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

      console.log("disliked accessories with id: ", post_id);
      result(null, res);
    }
  );
};

//a accessories liked or not
AccessoryLike.checkLike = (post_id, user_id, result) => {
  sql.query(
    "SELECT * FROM pet_accessories_likes WHERE post_id = ? and user_id = ?",
    [post_id, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`accessories is liked by = ${user_id} \n`, res);
      result(null, res);
      // return;
    }
  );
};

AccessoryLike.likeCount = (post_id, result) => {
  sql.query(
    "SELECT COUNT(*) as count FROM pet_accessories_likes WHERE post_id = ?",
    [post_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`Like count of ${post_id} is\n`, res);
      result(null, res);
      // return;
    }
  );
};

module.exports = AccessoryLike;
