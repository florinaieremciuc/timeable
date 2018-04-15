var express = require("express");
var router = express.Router();

var teamsController = require("../controllers/teams");

/* GET list of teams. */
router.get("/", (req, res) => {
  teamsController
    .getAll()
    .then(teams => res.send(teams))
    .catch(err => res.send(err));
});

/* GET a team */
router.get("/:id", (req, res) => {
  teamsController
    .getOne(req.params.id)
    .then(team => res.send(team))
    .catch(err => res.send(err));
});

/* CREATE a team */
router.post("/create_team", (req, res) => {
  teamsController
    .create({ name: req.body.name })
    .then(team => res.send(team))
    .catch(err => res.send(err));
});

// TO TEST
/* UPDATE a team */
router.get("/update/:id/:name", (req, res) => {
  teamsController
    .update(req.params.id, req.params.name)
    .then(
      // response is gt 0 if it finds a team with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404))
    )
    .catch(err => console.log("Error: ", err));
});

/* DELETE a team */
router.get("/delete/:id", (req, res) => {
  teamsController
    .delete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log("Error: ", err));
});

module.exports = router;
