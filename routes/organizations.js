var express = require("express");
var router = express.Router();

var organizationsController = require("../controllers/organizations");

/* GET list of organizations. */
router.get("/", (req, res) => {
  organizationsController
    .getAll()
    .then(response => response.json())
    .catch(err => err);
});

/* GET an organization */
router.get("/:id", (req, res) => {
  organizationsController
    .getOne(req.params.id)
    .then(response => response.json())
    .catch(err => console.log("Error: ", err));
});

router.post("/create_organization", (req, res) => {
  organizationsController
    .create({ name: req.body.name })
    .then(() => res.sendStatus(200))
    .catch(err => console.log("Error: ", err));
});

router.get("/update/:id/:name", (req, res) => {
  organizationsController
    .update(req.params.id, req.params.name)
    .then(
      // response is gt 0 if it finds an org with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404))
    )
    .catch(err => console.log("Error: ", err));
});

router.get("/delete/:id", (req, res) => {
  console.log("req din get", req.params, req.body);
  organizationsController
    .delete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log("Error: ", err));
});
router.post("/delete/:id", (req, res) => {
  console.log("req", req.paramsm, req.body);
  organizationsController
    .delete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log("Error: ", err));
});

module.exports = router;
