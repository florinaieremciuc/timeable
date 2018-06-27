const express = require('express');

const router = express.Router();

const tasksModel = require('../models/tasks');

/* GET assigned tasks */
router.get('/assigned/:teamid', (req, res) => {
  tasksModel
    .getAssigned(req.params.teamid)
    .then(tasks => res.send(tasks))
    .catch(err => res.send(err));
});

/* GET list of tasks from a project. */
router.get('/:projectid', (req, res) => {
  tasksModel
    .getAll(req.params.projectid)
    .then(tasks => res.send(tasks))
    .catch(err => res.send(err));
});

/* GET a task */
router.get('/:id', (req, res) => {
  tasksModel
    .getOne(req.params.id)
    .then(task => res.send(task))
    .catch(err => res.send(err));
});

/* GET unassigned tasks */
router.get('/not_assigned/:teamid', (req, res) => {
  tasksModel
    .getUnassigned(req.params.teamid)
    .then(tasks => res.send(tasks))
    .catch(err => res.send(err));
});

/* CREATE a task */
router.post('/add_task', (req, res) => {
  tasksModel
    .create({
      name: req.body.name,
      description: req.body.description,
      estimate: req.body.estimate,
      priority: req.body.priority,
      status: req.body.status,
      project: req.body.project,
    })
    .then(task => res.send(task))
    .catch(err => res.send(err));
});

// TO TEST
/* UPDATE a task */
// add assignee
router.post('/update/assignee', (req, res) => {
  tasksModel
    .addAssignee(req.body.id, req.body.assignee)
    .then(
      // response is gt 0 if it finds a project with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});
// add duration
router.post('/update/duration', (req, res) => {
  tasksModel
    .addDuration(req.body.id, req.body.duration)
    .then(response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});
// change status
router.post('/update/status', (req, res) => {
  tasksModel
    .changeStatus(req.body.id, req.body.status)
    .then(response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});
// change priority
router.post('/update/priority', (req, res) => {
  tasksModel
    .changePriority(req.body.id, req.body.priority)
    .then(response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});

/* DELETE a project */
router.delete('/delete/:id', (req, res) => {
  tasksModel
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => console.log('Error: ', err));
});

module.exports = router;
