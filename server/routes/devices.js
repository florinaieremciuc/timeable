const express = require('express');

const router = express.Router();

const devicesModel = require('../models/devices');

/* GET list of devices from a project. */
router.get('/:projectid', (req, res) => {
  devicesModel
    .getAll(req.params.projectid)
    .then(devices => res.send(devices))
    .catch(err => res.send(err));
});

/* GET a device */
router.get('/:id', (req, res) => {
  devicesModel
    .getOne(req.params.id)
    .then(device => res.send(device))
    .catch(err => res.send(err));
});

/* CREATE a device */
router.post('/add_device', (req, res) => {
  devicesModel
    .create({
      name: req.body.name,
      specs: req.body.specs,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      project: req.body.project,
      user: req.body.user,
      price: req.body.price,
    })
    .then(device => res.send(device))
    .catch(err => res.send(err));
});

/* DELETE a device */
router.delete('/delete/:id', (req, res) => {
  devicesModel
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.send(err));
});

module.exports = router;
