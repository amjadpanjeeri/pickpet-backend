const sql = require("../models/db");

// constructor

const Post = function (post) {
  this.post_id = post.post_id;
  this.user_id = post.user_id;
  this.post_name = post.post_name;
  this.post_category = post.post_category;
  this.post_description = post.post_description;
  this.post_date = post.post_date;
  this.address = post.address;
  this.sex = post.sex;
  this.age = post.age;
  this.contact_number = post.contact_number;
  this.price = post.price;
  this.image1 = post.image1;
  this.image2 = post.image2;
  this.image3 = post.image3;
  this.image4 = post.image4;
};

//creating new post
Post.create = (newPost, result) => {
  sql.query("INSERT INTO pets SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

//retrieving all pets of a given user
Post.getUserPost = (user_id, result) => {
  sql.query("SELECT * FROM pets WHERE user_id = ?", [user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`post of user with user_id = ${user_id} \n`, res);
    result(null, res);
  });
};

//retrieving all pets under a category
Post.getCategoryPost = (post_category, result) => {
  sql.query(
    `SELECT * FROM pets WHERE post_category = "${post_category}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`post under category- ${post_category}  = ${res} \n`, res);
      result(null, res);
    }
  );
};

//retrieving all pets of all users
Post.getAll = (result) => {
  sql.query("SELECT * FROM pets", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`all pets in the database\n`, res);
    result(null, res);
  });
};

//updating post
Post.updateById = (post_id, post, result) => {
  sql.query(
    "UPDATE pets SET post_name = ? , post_category = ? , post_description = ? , post_date = ? , address = ? ,sex = ? , age = ? , contact_number = ? , price = ? WHERE post_id = ?",
    [
      post.post_name,
      post.post_category,
      post.post_description,
      post.post_date,
      post.address,
      post.sex,
      post.age,
      post.contact_number,
      post.price,
      post_id,
    ],
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
      result(null, res);
    }
  );
};

//updating like count
Post.updateLike = (post_id, result) => {
  sql.query(
    "UPDATE pets SET likes = likes+1 WHERE post_id = ?",
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
      result(null, res);
    }
  );
};

//dislike
Post.updateDisLike = (post_id, result) => {
  sql.query(
    "UPDATE pets SET likes = likes-1 WHERE post_id = ?",
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

      console.log("disliked post: ", { id: post_id });
      result(null, res);
    }
  );
};

//retrieving count of all pets of a given user
Post.getCount = (user_id, result) => {
  sql.query(
    "SELECT COUNT(*) as post_count FROM pets union pet_accessories union pet_foods WHERE user_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`No.of pets of user with user_id = ${res[0].post_count} \n`);
      result(null, res[0]);
      return;
      // result(null,res);
    }
  );
};

Post.remove = (post_id, user_id, result) => {
  var flag = 0;
  sql.query(`DELETE FROM post_likes WHERE post_id = ${post_id}`, (err, res) => {
    if (err) {
      flag = 1;
    }

    if (res.affectedRows == 0) {
      // not found post with the id
      flag = 1;
    }

    console.log("deleted post with id: ", post_id);
  });
  sql.query(`DELETE FROM saved_post WHERE post_id = ${post_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      flag = 1;
    }
    console.log("deleted post with id: ", post_id);
    // result(null, res);
  });
  sql.query(
    `DELETE FROM pets WHERE post_id = ${post_id} and user_id = "${user_id}"`,
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

      console.log("deleted post with id: ", post_id);
      result(null, res);
    }
  );
};

module.exports = Post;
