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

//login and register
const auth = require('./app/user/user.routes');
app.use('/auth',auth);

//userprofile API
const userprofile = require('./app/userprofile/profile.routes');
app.use('/userprofile',userprofile);

//posts
const post = require('./app/posts/posts.routes');
app.use('/posts',post);

//subscription
const subscription = require('./app/subscription/subscription.routes');
app.use('/subscription',subscription);

//favourites
const favourites = require('./app/favourites/favourites.routes');
app.use('/favourites',favourites);

//liking posts
const likes = require('./app/postLike/likes.routes');
app.use('/likes',likes);

// set port, listen for requests
let PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000.");
});
// http.createServer(function(req,res) {
//   res.writeHead(200,{'Content-Type': 'text/plain'});
//   res.end('Working');
// }).listen(PORT, "127.0.0.1");
