const sql = require("../models/db");
const { use } = require("../user/user.routes");

// constructor
const Favourite = function (favourite) {
  this.user_id = favourite.user_id;
  this.post_id = favourite.post_id;
};

//adding new post to favourites
Favourite.create = (newFavourite, result) => {
  sql.query("INSERT INTO favourites SET ?", newFavourite, (err, res) => {
    if (err) {
      ~console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Favourite: ", { id: res.insertId, ...newFavourite });
    result(null, { id: res.insertId, ...newFavourite });
  });
};

//listing all favourites
Favourite.getAll = (user_id, result) => {
  sql.query(
    "SELECT * FROM favourites where user_id = ?",
    [user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("favourites: ", res);
      result(null, res);
    }
  );
};

//removing from favourites
Favourite.remove = (user_id, post_id, result) => {
  sql.query(
    "DELETE FROM favourites WHERE user_id = ? and post_id = ?",
    [user_id, post_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted favourite with post_id: ", post_id);
      result(null, res);
    }
  );
};

module.exports = Favourite;
