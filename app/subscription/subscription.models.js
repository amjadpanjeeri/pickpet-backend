const sql = require("../models/db");

// constructor
const Follower = function(follower) {
  this.user_id = follower.user_id;
  this.follower_id = follower.follower_id;
};


//for following a user
Follower.create = (newFollower, result) => {
  sql.query("INSERT INTO followers SET ?", newFollower, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created follower: ", { id: res.insertId, ...newFollower });
    result(null, { id: res.insertId, ...newFollower });
  });
};


//for unfollowing a user
Follower.remove = (follower_id,user_id, result) => {
    sql.query("DELETE FROM followers WHERE user_id = ? and follower_id = ?",[ user_id,follower_id], (err, res) => {
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
  
      console.log("deleted follower with id: ", follower_id);
      result(null, res);
    });
  };



//for listing all followers of a user
Follower.getAll = result => {
    sql.query("SELECT * FROM followers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("followers: ", res);
      result(null, res);
    });
  };


  module.exports = Follower;
