const Userprofile = require("./profile.model");


//adding user details
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const userprofile = new Userprofile({
    user_id: req.body.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    sex: req.body.sex,
    user_type: req.body.user_type,
    address: req.body.address
  });

  // Save Customer in the database
  Userprofile.create(userprofile, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};


//getting user details
exports.findOne = (req, res) => {
  Userprofile.findById(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.user_id
        });
      }
    } else res.send(data);
  });
};


//updating user profile
exports.editUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Userprofile.updateById(
    req.params.user_id,
    new Userprofile(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.user_id
          });
        }
      } else res.send(data);
    }
  );
};



//getting all posts of all users
exports.findAll = (req, res) => {
  Userprofile.getAllUsers((err, data) => {
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

exports.deleteAccount = (req, res) => {
  Userprofile.deleteUser(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found userprofile with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete userprofile with id " + req.params.user_id
        });
      }
    } else res.send({ message: `userprofile was deleted successfully!` });
  });
};
