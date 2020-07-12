
const Post = require("./posts.model");

//adding new post
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a post
  const post = new Post({
    user_id:user_id,
    post_name: "Persian cat",
    post_category:"cat",
    post_description: "Good one with 2 years old",
    post_date : '2020-10-07',
    place:"edavannappara",
    contact_number:"9876543210",
    price:"2000",
    likes:0
  });

  // Save post in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post."
      });
    else res.send(data);
  });
};


//getting all posts of a given user
exports.userPost = (req, res) => {
  console.log(req.params.user_id);
  
  if (!req.params.post_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Post.getAll(req.params.user_id,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error while retreiving post of user " + req.params.user_id
        });
      }
    } else res.send(data);
  });
};


//getting all posts of all users
exports.findAll = (req, res) => {
  Post.getAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `table doesn't exist`
        });
      } else {
        res.status(500).send({
          message: "Error while retreiving posts"
        });
      }
    } else res.send(data);
  });
};


//updating a post
exports.editPost = (req, res) => {
  // Validate Request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Post.updateById(
    req.params.post_id,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found post with id ${req.params.post_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating post with id " + req.params.post_id
          });
        }
      } else res.send(data);
    }
  );
};


//updating like count
exports.update = (req, res) => {
    // Validate Request

    if (!req.params.post_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Post.updateById(
      req.params.post_id,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found post with id ${req.params.post_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating post with id " + req.params.post_id
            });
          }
        } else res.send(data);
      }
    );
  };