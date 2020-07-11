const Favourite = require("./favourites.model");


//adding new post to favourites
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const favourite = new Favourite({
      user_id: user_id,
      post_id: 2,
    });
  
    // Save Customer in the database
    Favourite.create(favourite, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while addind to favourites."
        });
      else res.send(data);
    });
  };



  //listing all favourites
  exports.findAll = (req, res) => {
    Favourite.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving favourites."
        });
      else res.send(data);
    });
  };


  //removing from favourites
  exports.delete = (req, res) => {
    Favourite.remove(user_id,req.params.post_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found post with id ${req.params.post_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete favourite with id " + req.params.post_id
          });
        }
      } else res.send({ message: `favourite was deleted successfully!` });
    });
  };