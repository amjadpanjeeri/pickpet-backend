/*
 * GET home page.
 */

const db = require("../models/db");
exports.index = function (req, res) {
  message = "";
  var id = req.body.id;
  var type = req.body.type;
  var address = req.body.address;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var mob = req.body.mob;

  if (!req.files) return res.status(400).send("No files were uploaded.");

  var file = req.files.uploaded_image;
  var img_name = file.name;
  // ALTER TABLE liked_posts DROP CONSTRAINT posts_ibfk_1;
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/jpg"
  ) {
    file.mv(__dirname + "/uploads" + file.name, function (err) {
      if (err) return res.status(500).send(err);

      var sql =
        "INSERT INTO user_profile VALUES ('" +
        id +
        "','" +
        fname +
        "','" +
        lname +
        "','" +
        mob +
        "','" +
        type +
        "','" +
        address +
        "','" +
        img_name +
        "')";

      var query = db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send({ success: 1 });
      });
    });
  } else {
    message =
      "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    res.send({ message: message });
  }
};

exports.profile = function (req, res) {
  var message = "";
  var id = req.params.id;
  db.query(
    "SELECT * FROM user_profile WHERE user_id = ?",
    id,
    (err, result) => {
      if (err) {
        message = "Profile not found!";
        result(err, null);
        return;
      }
      console.log(result);
      res.send({ data : result,message: "message" });
    }
  );
};

exports.viewprofile = function (req, res) {
  res.send("hello world");
};
