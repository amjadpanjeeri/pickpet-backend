const User = require("../models/user.model");

//Create and save a new user
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

     //create a user
    const user = new User({
        username: "amjad",
        password: "123456",
        phone: "9876543210",
        email: "amjad@gmail.com"
    });


    //save user in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "error occured while creating new user."
            });
        else res.send(data);
    });
};





//Sign in
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error while retrieving user with id" + req.params.userId
                });
            }
        }
        else
            res.send(data);
    });
};

//deleting user
exports.delete = (req,res) => {
    User.remove(req.params.userId,(err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(400).send({
                    message:`Not found with id = ${req.params.userId}`
                });
            }
            else{
                res.status(500).send({
                    message:"Couldn't delete user with user id "+ req.params.userId
                });
            }
        }
        else
            res.send({
                message:"Deleted"
            });
    });
};


//updating user
exports.update = (req, res) => {
    // Validate Request
    const mail="a@gmail.com";
    if (!mail) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    User.updateById(
      req.params.userId,
      mail,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating user with id " + req.params.userId
            });
          }
        } else res.send(data);
      }
    );
  };