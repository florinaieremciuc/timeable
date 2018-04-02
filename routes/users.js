var express = require("express");
var router = express.Router();

var usersController = require("../controllers/users");

router.post("/create_user", (req, res) => {
  usersController
    .createUser({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone
    })
    .then(() => res.sendStatus(200));
});

router.post("/login", (req, res) => {
  usersController
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success) res.sendStatus(200);
      else res.sendStatus(401);
    });
});

module.exports = router;
