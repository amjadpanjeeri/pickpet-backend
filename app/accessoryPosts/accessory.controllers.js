const db = require("../models/db");
const fs = require("fs");
exports.index = function (req, res) {
  message = "";
  var user_id = req.body.user_id;
  var post_name = req.body.post_name;
  var brand = req.body.brand;
  var post_description = req.body.description;
  var date = req.body.post_date;
  var size = req.body.size;
  var contact_number = req.body.contact_number;
  var price = req.body.price;
  if (!req.files) return res.status(400).send("No files were uploaded.");
  var file1 = req.files.uploaded_image1;
  var file2 = req.files.uploaded_image2;
  var file3 = req.files.uploaded_image3;
  var file4 = req.files.uploaded_image4;
  var is_featured = 0;
  var flag = 0;
  var post_images = new Array(file1, file2, file3, file4);
  // res.send({ post_images });
  for (var i = 0; i < 4; i++) {
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
    var sql 
    = `INSERT INTO pet_accessories (user_id,product_name,product_brand,product_size,product_description,date,contact_number,product_price,product_image1,product_image2,product_image3,product_image4,is_featured) VALUES ('${user_id}','${post_name}','${brand}','${size}','${post_description}','${date}','${contact_number}', ${price},'${post_images[0].name}','${post_images[1].name}','${post_images[2].name}','${post_images[3].name}', ${is_featured});`;
//    var sql = " INSERT INTO `pet_accessories` ( `user_id`, `product_name`, `product_brand`, `product_size`, `product_description`, `date`, `contact_number`, `product_price`, `product_image1`, `product_image2`, `product_image3`, `product_image4`, `is_featured`) VALUES ( '5dnd3pkgymocn2', 'Dog Bowl', 'AmazonBasics', '27 x 27 ', 'Set of 2 stainless-steel food bowls for puppies, dogs, cats, or kittens.Holds up to 0.9 Kg. perfect for dry kibble, wet food, treats, or water,perfect for dry kibble, wet food, treats, or water,Rust resistant,offers a healthy alternative to plastic,doesnt hold odors,No-tip design', '21-12-2020', '98745613210', '599', 'images.jpeg', 'images1.jpeg', 'images2.jpeg', 'images3.jpeg', '0');";
    var query = db.query(sql, function (err, result) {
      if (err) {
        console.log(err);
        message = "Error while uploading post";
        res.status(404).json({ message: message, err: err });
      } else {
        res.json({ success: 1, result: result });
      }
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

//view all accessories
exports.viewAllAccessories = function (req, res) {
    var user_id = req.params.user_id;
    db.query(
      `SELECT * FROM pet_accessories`,
      (err, result) => {
        if (err) {
          message = "accessories not found!";
          result(err, null);
          return;
        }
        console.log(result);
        // result(null, result);
        res.json({ data: result });
      }
    );
  };

//get accessories of a user

exports.viewUserAccessories = function (req, res) {
    var user_id = req.params.user_id;
    db.query(
      `SELECT * FROM pet_accessories where user_id = "${user_id}"`,
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


  //delete food of a user

exports.deleteAccessory = function (req, res) {
  var product_id = req.params.product_id;
  db.query(
    `DELETE FROM pet_accessories where product_id = "${product_id}"`,
    (err, result) => {
      if (err) {
        message = "accessory not found!";
        result(err, null);
        return;
      }
      console.log(result);
      // result(null, result);
      res.json({ data: result });
    }
  );
};

  //to make featured food of a user

exports.makeFeatured = function (req, res) {
  var product_id = req.params.product_id;
  db.query(
    `UPDATE pet_accessories SET is_featured = 1 where product_id = "${product_id}"`,
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
