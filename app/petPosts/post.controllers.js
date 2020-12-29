const db = require("../models/db");
const fs = require("fs");
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
  var file1 = req.files.uploaded_image1;
  var file2 = req.files.uploaded_image2;
  var file3 = req.files.uploaded_image3;
  var file4 = req.files.uploaded_image4;
  var flag = 0;
  var is_featured = 0;
  var post_images = new Array(file1, file2, file3, file4);
  // res.send({ post_images });
  for (var i = 0; i < 4; i++) {
    console.log(post_images[i].mimetype);

    if (
      post_images[i].mimetype == "image/jpeg" ||
      post_images[i].mimetype == "image/png" ||
      post_images[i].mimetype == "image/gif" ||
      post_images[i].mimetype == "image/jpg" ||
      post_images[i].mimetype == "application/octet-stream"
    ) {
      post_images[i].mv(
        __dirname + "/uploads/" + post_images[i].name,
        function (err) {
          if (err) return res.status(500).send(err);
        }
      );
      flag = 1;
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      res.status(404).json({ message: message });
    }
  }
  if (flag == 1) {
    var sql =
      "INSERT INTO pets (user_id,post_name,post_category,post_description,post_date,sex,age,contact_number,price,image1,image2,image3,image4,is_featured) VALUES ('" +
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
      sex +
      "','" +
      age +
      "','" +
      contact_number +
      "','" +
      price +
      "','" +
      post_images[0].name +
      "','" +
      post_images[1].name +
      "','" +
      post_images[2].name +
      "','" +
      post_images[3].name +
      "','" +
      is_featured +
      "')";
    var query = db.query(sql, function (err, result) {
      if (err) {
        message = "Error while uploading post";
        res.status(404).json({ message: err });
      }
      res.send({ success: 1, result: result });
    });
  }
};

exports.image1 = function (req, res) {
  var image = req.params.name;
  var file = image;
  var img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
};

exports.image2 = function (req, res) {
  var image = req.params.name;
  var file = image;
  var img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
};

exports.image3 = function (req, res) {
  var image = req.params.name;
  var file = image;
  var img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
};

exports.image4 = function (req, res) {
  var image = req.params.name;
  var file = image;
  var img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { "Content-Type": "image/jpg" });
  res.end(img, "binary");
};

//to make featured food of a user

exports.makeFeatured = function (req, res) {
  var product_id = req.params.product_id;
  db.query(
    `UPDATE pets SET is_featured = 1 where post_id = "${product_id}"`,
    (err, result) => {
      if (err) {
        message = "Accessory not found!";
        // result(err, null);
        res.json({ error: err });
        return;
      }
      console.log(result);
      //   result(null, result);
      res.json({ data: result });
    }
  );
};
