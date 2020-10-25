/*
 * GET home page.
 */

const db = require("../models/db");
exports.index = function (req, res) {
  message = "";
  var id=req.body.user_name;
  var type = req.body.user_type;
  var address = req.body.address;
  var fname = req.body.first_name;
  var lname = req.body.last_name;
  var mob = req.body.mob_no;

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
        res.send('success');
      });
    });
  } else {
    message =
      "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    res.render("index.ejs", { message: message });
  }
};

exports.profile = function (req, res) {
  var message = "";
  var id = req.params.id;
  var sql = "SELECT * FROM `users_image` WHERE `id`='" + id + "'";
  db.query(sql, function (err, result) {
    if (result.length <= 0) message = "Profile not found!";

    res.render("profile.ejs", { data: result, message: message });
  });
};

exports.viewprofile = function (req, res) {
  res.send("hello world");
};
