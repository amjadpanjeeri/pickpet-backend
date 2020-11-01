const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log(token);
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      console.log(decoded);
      next();
    });
  },
};
