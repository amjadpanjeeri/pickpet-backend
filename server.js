const express = require("express");
const bodyParser = require("body-parser");
var crypto = require('crypto');
const db = require("./app/models/db");
const KEY = "m yincredibl y(!!1!11!)<'SECRET>)Key'!";
// const http = require('http');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to pickpet application." });
});

// app.post("/signup", express.urlencoded(), function (req, res) {
//   // in a production environment you would ideally add salt and store that in the database as well
//   // or even use bcrypt instead of sha256. No need for external libs with sha256 though
//   var password = crypto
//     .createHash("sha256")
//     .update(req.body.password)
//     .digest("hex");
//   db.get("SELECT FROM users WHERE username = ?", [req.body.username], function (
//     err,
//     row
//   ) {
//     if (row != undefined) {
//       console.error("can't create user " + req.body.username);
//       res.status(409);
//       res.send("An user with that username already exists");
//     } else {
//       console.log("Can create user " + req.body.username);
//       db.run(
//         "INSERT INTO users(username,email,phone, password) VALUES (?, ?,?,?)",
//         [req.body.username, req.body.email, req.body.phone, password]
//       );
//       res.status(201);
//       res.send("Success");
//     }
//   });
// });

// app.post("/login", express.urlencoded(), function (req, res) {
//   console.log(req.body.username + " attempted login");
//   var password = crypto
//     .createHash("sha256")
//     .update(req.body.password)
//     .digest("hex");
//   db.get(
//     "SELECT * FROM users WHERE (username, password) = (?, ?)",
//     [req.body.username, password],
//     function (err, row) {
//       if (row != undefined) {
//         var payload = {
//           username: req.body.username,
//         };

//         var token = jwt.sign(payload, KEY, {
//           algorithm: "HS256",
//           expiresIn: "15d",
//         });
//         console.log("Success");
//         res.send(token);
//       } else {
//         console.error("Failure");
//         res.status(401);
//         res.send("There's no user matching that");
//       }
//     }
//   );
// });

//login and register
const auth = require('./app/user/user.routes');
app.use('/auth',auth);

//userprofile API
const userprofile = require("./app/userprofile/profile.routes");
app.use("/userprofile", userprofile);

//posts
const post = require("./app/posts/posts.routes");
app.use("/posts", post);

//subscription
const subscription = require("./app/subscription/subscription.routes");
app.use("/subscription", subscription);

//favourites
const favourites = require("./app/favourites/favourites.routes");
app.use("/favourites", favourites);

// set port, listen for requests
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});
// http.createServer(function(req,res) {
//   res.writeHead(200,{'Content-Type': 'text/plain'});
//   res.end('Working');
// }).listen(PORT, "127.0.0.1");
