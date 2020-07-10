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
      user_id: user_id,
      first_name: "Amjad",
      last_name: "N",
      age: 20,
      sex: "M",
      user_type: "individual",
      address: "parambil house"
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