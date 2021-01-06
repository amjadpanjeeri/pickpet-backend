const PetFoodLike = require("./foodLikes.model");

//for following another user
exports.likePetFood = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            status:404,
            message: "Content can not be empty!"
        });
    }

    //Liking a post
    const like = new PetFoodLike({
        post_id: req.params.post_id ,
        user_id: req.params.user_id
    });

    // Save Like in the database
    PetFoodLike.create(like, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while liking pet food."
            });
        else {
            res.send(data);
            // const user_id = res[0].user_id;
        }
    });
};


//disliking
exports.dislikePetFood = (req, res) => {
    const post_id=req.params.post_id;
    const user_id=req.params.user_id;
    PetFoodLike.remove(post_id,user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found pet food with id ${req.params.post_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not dislike pet food with id " + req.params.post_id
                });
            }
        } else res.send({ message: `pet food was disliked successfully!` });
    });

};


//checking
exports.likedorNot = (req, res) => {
    if (!req.params.post_id) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    PetFoodLike.checkLike(req.params.post_id,req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found pet food with id ${req.params.post_id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error while retreiving pet food of user " + req.params.post_id,
          });
        }
      } else res.send(data);
    });
  };

  exports.CountofLike = (req, res) => {
    if (!req.params.post_id) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    PetFoodLike.likeCount(req.params.post_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found pet food with id ${req.params.post_id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error while retreiving count of like of pet food with post_id " + req.params.post_id,
          });
        }
      } else res.send(data);
    });
  };
  