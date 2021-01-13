const sql = require("../models/db");

// constructor
const Follower = function (follower) {
  this.user1_id = follower.user_id;
  this.user2_id = follower.follower_id;
};

//for following  a user
Follower.create = (newFollower, result) => {
  sql.query("INSERT INTO followers_table SET ?", newFollower, (err, res) => {
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
    "DELETE FROM followers_table WHERE user1_id = ? and user2_id = ?",
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

//for listing all followers_table of a user
Follower.getAll = (user_id, result) => {
  sql.query(
    `SELECT user_id,first_name,last_name,mobile,user_type,address,profile_image,payment_id FROM user_profile,followers_table where followers_table.user1_id = "${user_id}" and followers_table.user2_id = user_profile.user_id `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(res);
      result(null, res);
    }
  );
};

//followers of a user

//followers_table count
Follower.getFollowersCount = (user_id, result) => {
  sql.query(
    "SELECT COUNT(*) as followers_count FROM followers_table WHERE user1_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(
        `No.of followers of user with user_id = ${res[0].followers_count} \n`
      );
      result(null, res[0]);
      return;
      // result(null,res);
    }
  );
};

//followers count
Follower.getFollowingCount = (user_id, result) => {
  sql.query(
    "SELECT COUNT(*) as followers_count FROM followers_table WHERE user2_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(
        `No.of followers of user with user_id = ${res[0].followers_count} \n`
      );
      result(null, res[0]);
      return;
      // result(null,res);
    }
  );
};

//a post liked or not
Follower.checkfollowing = (user_id, follower_id, result) => {
  sql.query(
    "SELECT * FROM followers_table WHERE user1_id = ? and user2_id = ?",
    [user_id, follower_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`followed by = ${user_id} \n`, res);
      result(null, res);
      // return;
    }
  );
};

module.exports = Follower;
