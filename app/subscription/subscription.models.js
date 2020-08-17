const sql = require("../models/db");

// constructor
const Follower = function (follower) {
  this.user_id = follower.user_id;
  this.follower_id = follower.follower_id;
};

//for following  a user
Follower.create = (newFollower, result) => {
  sql.query("INSERT INTO followers SET ?", newFollower, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created follower: ", {
      user_id: res.insertId,
      ...newFollower,
    });
    result(null, res);
  });
};

//for unfollowing a user
Follower.remove = (follower_id, user_id, result) => {
  sql.query(
    "DELETE FROM followers WHERE user_id = ? and follower_id = ?",
    [user_id, follower_id],
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

      console.log("deleted follower with id: ", follower_id);
      result(null, res);
    }
  );
};

//for listing all followers of a user
Follower.getAll = (user_id, result) => {
  sql.query(
    "SELECT * FROM followers where user_id = ? ",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("followers: ", res);
      result(null, res);
    }
  );
};


//followers count
Follower.getFollowersCount = (user_id, result) => {
  sql.query(
    "SELECT COUNT(*) as followers_count FROM followers WHERE user_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`No.of followers of user with user_id = ${res[0].followers_count} \n`);
      result(null, res[0]);
      return;
      // result(null,res);
    }
  );
};

//followers count
Follower.getFollowingCount = (user_id, result) => {
  sql.query(
    "SELECT COUNT(*) as followers_count FROM followers WHERE follower_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`No.of followers of user with user_id = ${res[0].followers_count} \n`);
      result(null, res[0]);
      return;
      // result(null,res);
    }
  );
};

module.exports = Follower;
