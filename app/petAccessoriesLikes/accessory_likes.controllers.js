const Like = require("./accessory_likes.model");

//for following another user
exports.likeAccessory = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            status:404,
            message: "Content can not be empty!"
        });
    }

    //Liking a post
    const like = new Like({
        post_id: req.params.post_id ,
        user_id: req.params.user_id
    });

    // Save Like in the database
    Like.create(like, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else {
            res.send(data);
            // const user_id = res[0].user_id;
        }
    });
};


//disliking
exports.dislikeAccessory = (req, res) => {
    const post_id=req.params.post_id;
    const user_id=req.params.user_id;
    Like.remove(post_id,user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found accessorywith id ${req.params.post_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not dislike accessory with id " + req.params.post_id
                });
            }
        } else res.send({ message: `accessory was disliked successfully!` });
    });

};


//checking
exports.likedorNot = (req, res) => {
    if (!req.params.post_id) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Like.checkLike(req.params.post_id,req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found accessory with id ${req.params.post_id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error while retreiving accessory of user " + req.params.post_id,
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
    Like.likeCount(req.params.post_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found accessory with id ${req.params.post_id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error while retreiving count of like of accessory with post_id " + req.params.post_id,
          });
        }
      } else res.send(data);
    });
  };
  