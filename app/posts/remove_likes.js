const sql = require("../models/db");

exports.removelikes = (post_id, result) => {
  sql.query(`DELETE FROM liked_post WHERE post_id = ${post_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      next();
    }

    if (res.affectedRows == 0) {
      // not found post with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted all likes of post with id: ", post_id);
    result(null, res);
  });
};
