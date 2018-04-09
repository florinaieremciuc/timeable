const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// ROUTES
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");
const organizationsRoute = require("./routes/organizations");
const teamsRoute = require("./routes/teams");

app.use(express.static("public"));
app.use(bodyParser.json());

// app.use("/", indexRoute);
app.use("/users", usersRoute);
app.use("/organizations", organizationsRoute);
app.use("/teams", teamsRoute);

app.use((error, req, res, next) => {
  if (!error) {
    next();
  } else {
    console.error(error.stack);
    res.sendStatus(500);
  }
});

var server = app.listen(3001, () => {
  console.log("Server running on http://localhost:" + server.address().port);
});

module.exports = app;
