const express = require("express");
const bodyParser = require("body-parser");
const store = require("./store");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

app.use(function(error, req, res, next) {
  if (!error) {
    next();
  } else {
    console.error(error.stack);
    res.send(500);
  }
});

app.post("/createUser", (req, res) => {
  store
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

app.post("/login", (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      console.log("index.js TEST", success, req.body);
      if (success) res.sendStatus(200);
      else res.sendStatus(401);
    });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
