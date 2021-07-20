const User = require("../models/user.model.js");
const key = require("../config/auth.config.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async(req, res) => {
  // Validate request
  if (!req.body.user_name || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    res.end();
    return
  }

  // find email
  User.findByEmail(req.body.email, async(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
          // create user
          const hash_password = await bcrypt.hash(req.body.password, 10)
          req.body.password = hash_password
          User.create(new User(req.body), (err, data) => {
            if (err)
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Customer."
              });
            else res.send({
              id: data.id,
              user_name: data.user_name,
              email: data.email
            });
          });
      } else {
        res.status(500).send({
          message: "Error"
        });
      }
    } else res.status(400).send({
      message: "Email already have"
    });;
  });

};

exports.signin = async(req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    res.end();
    return
  }

  // find email
  User.findByEmail(req.body.email, async(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not Found"
        });
      } else {
        res.status(500).send({
          message: "Error"
        });
      }
    } else{
      if(await bcrypt.compare(req.body.password, data.password)){
        const playload = {
          userId: data.user_id,
          email: data.email
        }
        const token = jwt.sign(playload, key.secret, { expiresIn: '1d' })
        res.send({
          userId: data.user_id,
          user_name: data.user_name,
          email: data.email,
          token: token
        });
      }else{
        res.status(401).send({
          message: "Unauthorized"
        });
      }
    }
  });

};