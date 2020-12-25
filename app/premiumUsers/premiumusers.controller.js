const PremiumUser = require("./premiumusers.model");

//adding new user to premium users
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  var start_date = Date.now;
  var end_date = Date.now;
  // Create a user
  const premiumUser = new PremiumUser({
    user_id: req.params.user_id,
    type_of_subscription: req.body.premium_type,
    start_date: start_date,
    end_date: end_date,
    payment_id: req.body.payment_id,
    is_expired: false,
  });

  // Save user in the database
  PremiumUser.create(premiumUser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while addind to favourites.",
      });
    else res.send(data);
  });
};

exports.getUser = (req, res) => {
  if (!req.params.user_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  PremiumUser.getAuser(req.params.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Premium User.",
      });
    else res.send(data);
  });
};

//favourite or not
exports.premiumChecker = (req, res) => {
  if (!req.params.user_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  PremiumUser.checkPremiumUser(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error while retreiving user " + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};
