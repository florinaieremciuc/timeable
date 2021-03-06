const express = require('express');

const router = express.Router();

const usersModel = require('../models/users');

/* CREATE a user */
router.post('/create_user', (req, res) => {
  usersModel
    .createUser({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      team: req.body.team,
    })
    .then((user) => {
      console.log('Response: ', user);
      res.send({ user });
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.send({ error });
    });
});

/* GET team members */
router.get('/team/:teamid', (req, res) => {
  usersModel
    .getTeam(req.params.teamid)
    .then(members => res.send({ members }))
    .catch((err) => {
      console.log('Error get team members: ', err);
      res.send(err);
    });
});

/* GET all users */
router.get('/', (req, res) => {
  usersModel
    .getAll()
    .then(response => res.send(response))
    .catch((err) => {
      console.log('Error: ', err);
      res.send(err);
    });
});

/* GET TASK ASSIGNEES */
router.get('/task/:teamid', (req, res) => {
  usersModel
    .getAssignedToTask(req.params.teamid)
    .then(assignees => res.send({ assignees }))
    .catch(error => res.send(error));
});

/* GET a user */
router.get('/:id', (req, res) => {
  usersModel
    .getOne(req.params.id)
    .then(user => res.send({ user }))
    .catch((error) => {
      console.log('Error getting user: ', error);
      res.send(error);
    });
});

/* LOG in */
router.post('/login', (req, res) => {
  usersModel
    .authenticate({
      username: req.body.username,
      password: req.body.password,
    })
    .then(({
      success, user, error, message,
    }) => {
      if (success && user) res.send({ success, user });
      else res.send({ error, message });
    })
    .catch(error => res.send({ error, message: 'Caught error' }));
});

/* UPDATE a user */
// router.get("/update/:id/:name", (req, res) => {
//   usersModel
//     .update(req.params.id, req.params.name)
//     .then(
//       // response is gt 0 if it finds an org with the given id
//       response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404))
//     )
//     .catch(err => console.log("Error: ", err));
// });

/* DELETE a user */
router.get('/delete/:id', (req, res) => {
  usersModel
    .delete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log('Error: ', err));
});
module.exports = router;
