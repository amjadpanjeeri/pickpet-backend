// /*
//  * GET home page.
//  */

// const db = require("../models/db");
// exports.create = function (req, res) {
//   message = "";
//   this.post_id = post.post_id;
//   this.user_id = post.user_id;
//   this.post_name = post.post_name;
//   this.post_category = post.post_category;
//   this.post_description = post.post_description;
//   this.post_date = post.post_date;
//   this.address = post.address;
//   this.sex = post.sex;
//   this.age = post.age;
//   this.contact_number = post.contact_number;
//   this.price = post.price;

//   if (!req.files) return res.status(400).send("No files were uploaded.");

//   var image1 = req.files.image1;
//   var image2 = req.files.image2;
//   var image3 = req.files.image3;
//   var image4 = req.files.image4;
//   var img = [image1.name, image2.name, image3.name, image4.name];
//   // ALTER TABLE liked_posts DROP CONSTRAINT posts_ibfk_1;
//    if (err) return res.status(500).send(err);

//       var sql =
//         "INSERT INTO user_profile VALUES ('" +
//         id +
//         "','" +
//         fname +
//         "','" +
//         lname +
//         "','" +
//         mob +
//         "','" +
//         type +
//         "','" +
//         address +
//         "','" +
//         img_name +
//         "')";

//       var query = db.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.send({ success: 1 });
//       });
//     });
//   } else {
//     message =
//       "This format is not allowed , please upload file with '.png','.gif','.jpg'";
//     res.send({ message: message });
//   }
// };

// exports.profile = function (req, res) {
//   var message = "";
//   var id = req.params.id;
//   db.query(
//     "SELECT * FROM user_profile WHERE user_id = ?",
//     id,
//     (err, result) => {
//       if (err) {
//         message = "Profile not found!";
//         result(err, null);
//         return;
//       }
//       console.log(result);
//       res.send({ data: result, message: "message" });
//     }
//   );
// };

// exports.viewprofile = function (req, res) {
//   res.send("hello world");
// };
