const Auth = require("./user.model");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const auth = new Auth({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
  });
  const salt = bcrypt.genSaltSync(10);
  auth.password = bcrypt.hashSync(auth.password, salt);

  Auth.create(auth, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while authenticating the user.",
      });

    const result = bcrypt.compare(auth.password, data.password);

    if (result) {
      result.password = undefined;
      const jsontoken = sign({ result: result }, "pickpet", {
        expiresIn: "24h",
      });
      console.log(data.id);
      return res.json({
        user_id: data.id,
        success: 1,
        message: "logged in successfully",
        token: jsontoken,
      });
    } else {
      return res.json({
        success: 0,
        message: "logged in failed",
      });
    }
  });
};

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  Auth.getbyEmail(email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with email ${email}.`,
        });
      } else {
        res.status(500).send({
          message: "invalid email or password ",
        });
      }
    }
    print(data[0].password);
    print(password);

    const result = bcrypt.compare(password, data[0].password);
    if (result) {
      result.password = undefined;
      const jsontoken = sign({ result: result }, "pickpet", {
        expiresIn: "24h",
      });
      console.log(data);
      return res.json({
        data: data,
        success: 1,
        message: "logged in successfully",
        token: jsontoken,
      });
    } else {
      return res.json({
        success: 0,
        message: "logged in failed",
      });
    }
  });
};
