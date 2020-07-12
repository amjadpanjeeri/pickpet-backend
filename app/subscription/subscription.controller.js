const Follower = require("./subscription.models");

//for following another user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a follower
    const follower = new Follower({
        user_id: user_id,
        follower_id: req.params.follower_id 
    });

    // Save follower in the database
    Follower.create(follower, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        else {
            res.send(data);
            const user_id = res[0].user_id;
        }
    });
};


//for unfollow a user
exports.unfollow = (req, res) => {
    const follower_id=req.params.follower_id;
    Follower.remove(follower_id,user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.follower_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.follower_id
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};


//for listing all followers of a user
exports.findAll = (req, res) => {
    Follower.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};
