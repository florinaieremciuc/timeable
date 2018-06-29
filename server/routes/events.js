const express = require('express');

const router = express.Router();

const eventsModel = require('../models/events');

/* GET list of events from a team. */
router.get('/team/:teamid', (req, res) => {
  eventsModel
    .getAll(req.params.teamid)
    .then(events => res.send(events))
    .catch(err => res.send(err));
});

/* CREATE an event */
router.post('/create_event', (req, res) => {
  eventsModel
    .create({
      name: req.body.name,
      topic: req.body.topic,
      date: req.body.date,
      details: req.body.details,
      place: req.body.place,
      extra: req.body.extra,
      team: req.body.team,
    })
    .then(project => res.send(project))
    .catch(err => res.send(err));
});

/* DELETE an event */
router.delete('/delete/:id', (req, res) => {
  eventsModel
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => console.log('Error: ', err));
});

module.exports = router;
