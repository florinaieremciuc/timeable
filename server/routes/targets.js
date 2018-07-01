const express = require('express');

const router = express.Router();

const targetsModel = require('../models/targets');

/* GET list of targets from a project. */
router.get('/:projectid', (req, res) => {
  targetsModel
    .getAll(req.params.projectid)
    .then(targets => res.send(targets))
    .catch(err => res.send(err));
});

/* GET a target */
router.get('/:id', (req, res) => {
  targetsModel
    .getOne(req.params.id)
    .then(target => res.send(target))
    .catch(err => res.send(err));
});

/* CREATE a target */
router.post('/add_target', (req, res) => {
  targetsModel
    .create({
      description: req.body.description,
      achieved: req.body.achieved,
      project: req.body.project,
    })
    .then(target => res.send(target))
    .catch(err => res.send(err));
});

/* UPDATE a target */
router.post('/update/:id/:data', (req, res) => {
  targetsModel
    .delete(req.params.id, req.params.data)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.send(err));
});

/* DELETE a target */
router.delete('/delete/:id', (req, res) => {
  targetsModel
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.send(err));
});

module.exports = router;
