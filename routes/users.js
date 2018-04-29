const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

/* CREATE a user */
router.post('/create_user', (req, res) => {
  usersController
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

/* GET all users */
router.get('/', (req, res) => {
  usersController
    .getAll()
    .then(response => console.log('response', response))
    .catch(err => console.log('Error: ', err));
});

/* GET a user */
router.get('/:id', (req, res) => {
  usersController
    .getOne(req.params.id)
    .then(response => response)
    .catch(error => error);
});

/* LOG in */
router.post('/login', (req, res) => {
  usersController
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
//   usersController
//     .update(req.params.id, req.params.name)
//     .then(
//       // response is gt 0 if it finds an org with the given id
//       response => (response > 0 ? res.sendStatus(200) : res.sendStatus(404))
//     )
//     .catch(err => console.log("Error: ", err));
// });

/* DELETE a user */
router.get('/delete/:id', (req, res) => {
  usersController
    .delete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log('Error: ', err));
});
module.exports = router;
