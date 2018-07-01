const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// ROUTES
// const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const teamsRoute = require('./routes/teams');
const projectsRoute = require('./routes/projects');
const tasksRoute = require('./routes/tasks');
const targetsRoute = require('./routes/targets');
const risksRoute = require('./routes/risks');
const eventsRoute = require('./routes/events');
const devicesRoute = require('./routes/devices');

app.use([
  cors({
    exposedHeaders: ['Link'],
  }),
  bodyParser.json({
    limit: '5mb',
  }),
  bodyParser.urlencoded({ extended: true, limit: '5mb' }),
]);
app.use(express.static('public'));

// app.use("/", indexRoute);
app.use('/users', usersRoute);
app.use('/teams', teamsRoute);
app.use('/projects', projectsRoute);
app.use('/tasks', tasksRoute);
app.use('/targets', targetsRoute);
app.use('/risks', risksRoute);
app.use('/events', eventsRoute);
app.use('/devices', devicesRoute);

app.use((error, req, res, next) => {
  if (!error) {
    next();
  } else {
    console.error(error.stack);
    res.sendStatus(500);
  }
});

const server = app.listen(3001, () => {
  console.log('Server running on http://localhost:' + server.address().port);
});

module.exports = app;
