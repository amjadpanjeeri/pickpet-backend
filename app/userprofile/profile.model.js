const sql = require("../models/db");

//constructor
const Userprofile = function (userprofile) {
    this.first_name = userprofile.first_name;
    this.last_name = userprofile.last_name;
    this.age = userprofile.age;
    this.sex = userprofile.sex;
    this.user_type = userprofile.user_type;
    this.address = userprofile.address;
};


//completing profile
Userprofile.create = (newUserprofile, result) => {
    sql.query("INSERT INTO user_profile SET ?", newUserprofile, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user's profile: ", { id: res.insertId, ...newUserprofile });
        result(null, { id: res.insertId, ...newUserprofile });
    });
};


//display profile
Userprofile.findById = (user_id, result) => {
    sql.query("SELECT * FROM user_profile WHERE user_id = ?",
        [user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found userprofile with the id
        result({ kind: "not_found" }, null);
    });
};


//updating user profile
Userprofile.updateById = (id, userprofile, result) => {
    sql.query(
        "UPDATE user_profile SET first_name = ? , last_name = ? , age = ? , sex = ? , user_type = ? , address = ? WHERE user_id = ?",
        [userprofile.first_name, userprofile.last_name, userprofile.age, userprofile.sex, userprofile.user_type, userprofile.address,id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found userprofile with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated userprofile: ", { id: id, ...userprofile });
            result(null, { id: id, ...userprofile });
        }
    );
};


//retrieving all posts of all usersS
Userprofile.getAllUsers = (result) => {
    sql.query("SELECT * FROM user_profile",
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log(`all users in the database\n`, res);
            result(null, res);
        });
};


Userprofile.deleteUser = (user_id, result) => {
    sql.query("DELETE FROM user_profile WHERE user_id = ?", user_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found user with the user_id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with user_id: ", user_id);
      result(null, res);
    });
  };
  



module.exports = Userprofile;

