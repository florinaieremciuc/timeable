const express = require('express');

const router = express.Router();

const risksModel = require('../models/risks');

/* GET list of risks from a project. */
router.get('/:projectid', (req, res) => {
  risksModel
    .getAll(req.params.projectid)
    .then(risks => res.send(risks))
    .catch(err => res.send(err));
});

/* GET a risk */
router.get('/:id', (req, res) => {
  risksModel
    .getOne(req.params.id)
    .then(risk => res.send(risk))
    .catch(err => res.send(err));
});

/* CREATE a risk */
router.post('/add_risk', (req, res) => {
  risksModel
    .create({
      description: req.body.description,
      category: req.body.category,
      probability: req.body.probability,
      impact: req.body.impact,
      response: req.body.response,
      project: req.body.project,
    })
    .then(risk => res.send(risk))
    .catch(err => res.send(err));
});

/* DELETE a risk */
router.delete('/delete/:id', (req, res) => {
  risksModel
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.send(err));
});

module.exports = router;
