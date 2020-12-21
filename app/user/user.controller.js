const Auth = require("./user.model");
const bcrypt = require("bcrypt");
var uniqid = require("uniqid");
const config = require("../config/auth.config");
const { sign } = require("jsonwebtoken");
var jwt = require("jsonwebtoken");

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    var user_id = uniqid();
    const auth = new Auth({
        user_id: user_id,
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
                message: err.message || "Some error occurred while authenticating the user.",
            });
        else {
            const jsontoken = sign({ id: user_id }, config.secret, {
                expiresIn: "7d",
            });
            return res.json({
                data: user_id,
                success: 1,
                message: "logged in successfully..",
                token: jsontoken,
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
    var password1 = req.body.password;
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
        bcrypt.compare(password1, data[0].password, function(err, result) {
            if (err) {
                return res.json({
                    success: 0,
                    message: "No user found",
                });
            }
            if (result) {
                var jsontoken = jwt.sign({ id: data[0].user_id }, config.secret, {
                    expiresIn: "7d", // 24 hours
                });
                // const jsontoken = sign({ result: result }, config.secret, { algorithm: 'RS256' }, {
                //   expiresIn: "24h",
                // });
                return res.json({
                    data: data[0].user_id,
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
    });
};

//Google Authentication
exports.googleAuth = (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }
    var user_id = uniqid();

    Auth.gAuth(user_id, auth.email, auth.username, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while authenticating the user.",
            });
        else {
            const jsontoken = sign({ id: user_id }, config.secret, {
                expiresIn: "7d",
            });
            return res.json({
                data: user_id,
                success: 1,
                message: "logged in successfully..",
                token: jsontoken,
            });
        }
    });
};