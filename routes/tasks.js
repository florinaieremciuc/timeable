const express = require('express');

const router = express.Router();

const tasksController = require('../controllers/tasks');

/* GET list of tasks from a project. */
router.get('/:projectid', (req, res) => {
  tasksController
    .getAll(req.params.projectid)
    .then(tasks => res.send(tasks))
    .catch(err => res.send(err));
});

/* GET a task */
router.get('/:id', (req, res) => {
  tasksController
    .getOne(req.params.id)
    .then(task => res.send(task))
    .catch(err => res.send(err));
});

/* GET assigned tasks */
router.get('/:userid', (req, res) => {
  tasksController
    .getAssigned(req.params.userid)
    .then(tasks => res.send(tasks))
    .catch(err => res.send(err));
});

/* GET unassigned tasks */
router.get('/not_assigned', (req, res) => {
  tasksController
    .getUnassigned()
    .then(tasks => res.send(tasks))
    .catch(err => res.send(err));
});

/* CREATE a task */
router.post('/add_task', (req, res) => {
  tasksController
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
router.get('/update/:id/:assignee', (req, res) => {
  tasksController
    .update(req.params.id, req.params.assignee)
    .then(
      // response is gt 0 if it finds a project with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});
// add duration
router.get('/update/:id/:duration', (req, res) => {
  tasksController
    .update(req.params.id, req.params.duration)
    .then(
      // response is gt 0 if it finds a project with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});
// change status
router.get('/update/:id/:status', (req, res) => {
  tasksController
    .update(req.params.id, req.params.status)
    .then(
      // response is gt 0 if it finds a project with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});
// change priority
router.get('/update/:id/:priority', (req, res) => {
  tasksController
    .update(req.params.id, req.params.priority)
    .then(
      // response is gt 0 if it finds a project with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});

/* DELETE a project */
router.delete('/delete/:id', (req, res) => {
  tasksController
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => console.log('Error: ', err));
});

module.exports = router;
