const sql = require("../models/db");


const Auth = function (auth) {
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

        console.log("created user's account: ", { id: res.insertId, ...newAuth });
        result(null, { id: res.insertId, ...newAuth });
    });
};


Auth.getbyEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = ?`,email, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0].email);
        result(null, res[0]);
        return;
      }
  
      // not found user with the email
      result({ kind: "not_found" }, null);
    });
  };


module.exports=Auth;