const express = require('express');

const router = express.Router();

const projectsController = require('../controllers/projects');

/* GET list of projects from a team. */
router.get('/team/:teamid', (req, res) => {
  projectsController
    .getAll(req.params.teamid)
    .then(projects => res.send(projects))
    .catch(err => res.send(err));
});

/* GET projects related to non-teamlead users */
router.get('/user/:userId', (req, res) => {
  projectsController
    .getUserProjects(req.params.userId)
    .then(projects => res.send(projects))
    .catch(err => res.send(err));
});

/* GET a project */
router.get('/:id', (req, res) => {
  projectsController
    .getOne(req.params.id)
    .then(project => res.send(project))
    .catch(err => res.send(err));
});

/* CREATE a project */
router.post('/create_project', (req, res) => {
  projectsController
    .create({
      name: req.body.name,
      description: req.body.description,
      deadline: req.body.deadline,
      team: req.body.team,
      startDate: req.body.startDate,
    })
    .then(project => res.send(project))
    .catch(err => res.send(err));
});

// TO TEST
/* UPDATE a project */
router.get('/update/:id/:name', (req, res) => {
  projectsController
    .update(req.params.id, req.params.name)
    .then(
      // response is gt 0 if it finds a project with the given id
      response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404)))
    .catch(err => console.log('Error: ', err));
});

/* DELETE a project */
router.delete('/delete/:id', (req, res) => {
  projectsController
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => console.log('Error: ', err));
});

module.exports = router;
