const sql = require("../models/db");
 
//constructor
const Userprofile = function (userprofile) {
    this.user_id = userprofile.user_id;
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
    sql.query(`SELECT * FROM user_profile WHERE user_id = ${user_id}`, (err, res) => {
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

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Userprofile;

