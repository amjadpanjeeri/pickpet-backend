/*
 * GET home page.
 */

const db = require("../models/db");
const fs = require("fs");
const { profile } = require("console");
exports.editProfile = function (req, res) {
  message = "";
  var id = req.body.id;
  var type = req.body.type;
  var address = req.body.address;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var mob = req.body.mob;
  // if (!req.files) return res.status(400).send("No files were uploaded.");

  // var file = req.files.uploaded_image;
  // var img_name = file.name;
  // ALTER TABLE liked_posts DROP CONSTRAINT posts_ibfk_1;
  // if (
  //   file.mimetype == "image/jpeg" ||
  //   file.mimetype == "image/png" ||
  //   file.mimetype == "image/gif" ||
  //   file.mimetype == "image/jpg"
  // ) {
  // file.mv(__dirname + "/uploads" + file.name, function (err) {
  // if (err) return res.status(500).send(err);

  var sql = `UPDATE user_profile SET first_name="${fname}",last_name ="${lname}",mobile="${mob}",user_type="${type}",address="${address}" WHERE user_id="${id}"`;
  var query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ success: 1 });
  });
  // });
  // }
  // else {
  //   message =
  //     "This format is not allowed , please upload file with '.png','.gif','.jpg'";
  //   res.send({ message: message });
  // }
};

exports.CompleteProfile = function (req, res) {
  message = "";
  var id = req.body.id;
  var type = req.body.type;
  var address = req.body.address;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var mob = req.body.mob;
  var image = "";
  var sql = `INSERT INTO user_profile(user_id,first_name,last_name,mobile,user_type,address,profile_image) VALUES ("${id}","${fname}","${lname}","${mob}","${type}","${address}","${image}") `;
  var query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ success: 1 });
  });
  // });
  // }
  // else {
  //   message =
  //     "This format is not allowed , please upload file with '.png','.gif','.jpg'";
  //   res.send({ message: message });
  // }
};

exports.editImage = function (req, res) {
  if (!req.files) return res.status(400).send("No files were uploaded.");
  var id = req.params.user_id;
  var file = req.files.uploaded_image;
  console.log(file.mimetype);
  // var img_name = file.name;
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "application/octet-stream"
  ) {
    file.mv(__dirname + "/uploads" + file.name, function (err) {
      if (err) return res.status(500).send(err);

      var sql = `UPDATE user_profile SET  profile_image ="${file.name}" WHERE user_id="${id}"`;
      var query = db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send({ success: 1 });
      });
    });
  } else {
    message =
      "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    console.log(message);
    res.send({ message: message });
  }
};

// exports.profile = function (req, res) {
//   var message = "";
//   var id = req.params.id;
//   db.query(
//     "SELECT profile_image FROM user_profile WHERE user_id = ?",
//     id,
//     (err, result) => {
//       if (err) {
//         message = "Profile not found!";
//         result(err, null);
//         return;
//       }
//       // console.log(result[0].profile_image);
//       // console.log(result[0]['profile_image']);
//       var file = result[0]["profile_image"];
//       // console.log("uploads" + file);
//       var img = fs.readFileSync(__dirname + "/uploads" + file);
//       res.writeHead(200, { "Content-Type": "image/jpg" });
//       // res.json({ result });
//       // console.log(img);
//       // res.json({success:1});
//       res.end(img, "binary");
//     }
//     // __dirname + "/uploads" + file.name
//   );
// };

exports.profile = function (req, res) {
  var imageName = req.params.name;
  var file = imageName;
  var img = fs.readFileSync(__dirname + "/uploads" + file);
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
};

exports.viewprofile = function (req, res) {
  var user_id = req.params.user_id;
  db.query(
    `SELECT * FROM user_profile where user_id = "${user_id}"`,
    (err, result) => {
      if (err) {
        message = "Profile not found!";
        result(err, null);
        return;
      }
      console.log(result);
      // result(null, result);
      res.json({ data: result });
    }
  );
};

exports.viewFollowers = function (req, res) {
  var user_id = req.params.user_id;
  db.query(
    "SELECT * FROM user_profile where user_profile.user_id =(SELECT user2_id from followers_table where user1_id= ? )",
    [user_id],
    (err, result) => {
      if (err) {
        message = "Profile not found!";
        res.json({ success: 0, message: "no followers" });
      } else {
        console.log(result);
        // result(null, result);
        res.json({ data: result });
      }
    }
  );
};
