const Likes=require("../models/likes.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const likes = new Likes({
    post_id:"2",
    user_id: "1"
  });
  
  // Save Customer in the database
  Likes.create(likes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};