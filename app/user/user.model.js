const sql = require("../models/db");

const Auth = function (auth) {
  this.user_id = auth.user_id;
  this.email = auth.email;
  this.username = auth.username;
  this.password = auth.password;
  this.phone = auth.phone;
};

Auth.create = (newAuth, result) => {
  sql.query("INSERT INTO users SET ?", newAuth, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user's account: ", { newAuth });
    result(null, { newAuth });
  });
};

Auth.getbyEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = ?`, email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found user with the email
    result({ kind: "not_found" }, null);
  });
};

module.exports = Auth;
