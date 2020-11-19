const db = require("../models/db");
exports.index = function (req, res) {
  message = "";
  var user_id = req.body.user_id;
  var post_name = req.body.post_name;
  var post_category = req.body.post_category;
  var post_description = req.body.post_description;
  var post_date = req.body.post_date;
  var address = req.body.address;
  var sex = req.body.sex;
  var age = req.body.age;
  var contact_number = req.body.contact_number;
  var price = req.body.price;

  if (!req.files) return res.status(400).send("No files were uploaded.");
  var flag = 0;
  var imgArray = req.files;
  var post_images = new Array();
  for (var i = 0; i < 4; i++) {
    if (
      imgArray.images[i].mimetype == "image/jpeg" ||
      imgArray.images[i].mimetype == "image/png" ||
      imgArray.images[i].mimetype == "image/gif" ||
      imgArray.images[i].mimetype == "image/jpg"
    ) {
      post_images[i] =
        __dirname + "/uploads/" + Date.now() + imgArray.images[i].name;
      imgArray.images[i].mv(post_images[i], function (err) {
        if (err) return res.status(500).send(err);
      });
      flag = 1;
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.send({ message: message });
    }
  }
  if (flag == 1) {
    var sql =
      "INSERT INTO posts (user_id,post_name,post_category,post_description,post_date,address,sex,age,contact_number,price,image1,image2,image3,image4) VALUES ('" +
      user_id +
      "','" +
      post_name +
      "','" +
      post_category +
      "','" +
      post_description +
      "','" +
      post_date +
      "','" +
      address +
      "','" +
      sex +
      "','" +
      age +
      "','" +
      contact_number +
      "','" +
      price +
      "','" +
      imgArray.images[0].name +
      "','" +
      imgArray.images[1].name +
      "','" +
      imgArray.images[2].name +
      "','" +
      imgArray.images[3].name +
      "')";

    var query = db.query(sql, function (err, result) {
      if (err) {
        message = "Error while uploading post";
        res.send({ message: message, success: 0 });
      }
      res.send({ success: 1 });
    });
  }
};
