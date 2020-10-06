const Post = require("./posts.model");

//adding new post
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a post
  const post = new Post({
    user_id: req.body.user_id,
    post_name: req.body.post_name,
    post_category: req.body.post_category,
    post_description: req.body.post_description,
    post_date: req.body.post_date,
    address: req.body.address,
    sex: req.body.sex,
    age: req.body.age,
    contact_number: req.body.contact_number,
    price: req.body.price,
    image1: req.body.image1,
    image2: req.body.image2,
    image3: req.body.image3,
    image4: req.body.image4,
    image5: req.body.image5,
    likes: req.body.likes,
  });

  // Save post in the database
  Post.create(post, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the post.",
      });
    } else res.send(data);
  });
};

//getting all posts of a given user
exports.userPost = (req, res) => {
  if (!req.params.user_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Post.getUserPost(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error while retreiving post of user " + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};

//getting all posts of a given user
exports.Categoryfilter = (req, res) => {
  if (!req.params.post_category) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Post.getCategoryPost(req.params.post_category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category  ${req.params.post_category}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error while retreiving post of category " +
            req.params.post_category,
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
          message: `table doesn't exist`,
        });
      } else {
        res.status(500).send({
          message: "Error while retreiving posts",
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
      message: "Content can not be empty!",
    });
  }

  Post.updateById(req.params.post_id, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.post_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating post with id " + req.params.post_id,
        });
      }
    } else res.send(data);
  });
};

//updating like count
exports.update = (req, res) => {
  // Validate Request
  console.log(req.params.post_id);
  if (!req.params.post_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Post.updateLike(req.params.post_id, (err, data) => {
    if (err) {
      console.log(1);
      if (err.kind === "not_found")
        res.status(404).send({
          message: `Not found post with id ${req.params.post_id}.`,
        });
      else
        res.status(500).send({
          message: "Error updating post with id " + req.params.post_id,
        });
    } else res.send(data);
  });
};

//dislike post
exports.dislike = (req, res) => {
  // Validate Request
  console.log(req.params.post_id);
  if (!req.params.post_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Post.updateDisLike(req.params.post_id, (err, data) => {
    if (err) {
      console.log(1);
      if (err.kind === "not_found")
        res.status(404).send({
          message: `Not found post with id ${req.params.post_id}.`,
        });
      else
        res.status(500).send({
          message: "Error updating post with id " + req.params.post_id,
        });
    } else res.send(data);
  });
};

//getting count of all posts of a given user
exports.postCount = (req, res) => {
  if (!req.params.user_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Post.getCount(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error while retreiving post of user " + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};

exports.deletePost = (req, res) => {
  Post.remove(req.params.post_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.post_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.post_id,
        });
      }
    } else res.send({ message: `Post was deleted successfully!`, data });
  });
};
