import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';

import sagas from './sagas';

// CRuD from targets
import newTarget from './State/Targets/create/reducer';
import targets from './State/Targets/get/reducer';
import updateTarget from './State/Targets/update/reducer';
import deleteTarget from './State/Targets/delete/reducer';

// CRD from devices
import newDevice from './State/Devices/create/reducer';
import devices from './State/Devices/get/reducer';
import deleteDevice from './State/Devices/delete/reducer';

// CRUD ops for events
import deleteEvent from './State/Events/delete/reducer';
import events from './State/Events/get/reducer';
import event from './State/Events/create/reducer';

// CRD from risks
import newRisk from './State/Risks/create/reducer';
import risks from './State/Risks/get/reducer';
import deleteRisk from './State/Risks/delete/reducer';

// CRUD ops for tasks
import updateTask from './State/Tasks/update/reducer';
import deleteFromTask from './State/Tasks/delete/reducer';
import tasks from './State/Tasks/get/reducer';
import newtask from './State/Tasks/create/reducer';

// CRUD ops for projects
import deleteProject from './State/Projects/delete/reducer';
import projects from './State/Projects/get/reducer';
import project from './State/Projects/create/reducer';

// CRud ops for teams
import team from './State/Teams/get/reducer';
import newteam from './State/Teams/create/reducer';

// ops for user
import registrationsStatus from './State/Users/register/reducers';
import user from './State/Users/login/reducers';
import members from './State/Users/team/reducer';
import assignees from './State/Users/assignees/reducer';
import userById from './State/Users/user/reducer';

import modalVisible from './components/Modal/reducer';

const history = createHistory();
const defaultState = {
  modalVisible: false,
  newTarget: {
    data: {},
    sync: {
      attempting: 0,
      error: null,
    },
  },
  targets: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  updateTarget: {
    sync: {
      attempting: 0,
      error: null,
      success: null,
    },
  },
  deleteTarget: {
    sync: {
      attempting: 0,
      error: null,
      success: null,
    },
  },
  newDevice: {
    data: {},
    sync: {
      attempting: 0,
      error: null,
    },
  },
  devices: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  deleteDevice: {
    sync: {
      attempting: 0,
      error: null,
      success: null,
    },
  },
  deleteEvent: {
    sync: {
      attempting: 0,
      error: null,
      success: null,
    },
  },
  events: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  event: {
    data: null,
    sync: {
      attempting: 0,
      error: null,
    },
  },
  newRisk: {
    data: {},
    sync: {
      attempting: 0,
      error: null,
    },
  },
  risks: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  deleteRisk: {
    sync: {
      attempting: 0,
      error: null,
      success: null,
    },
  },
  userById: {
    item: {},
    sync: {
      attempting: 0,
      error: null,
    },
  },
  updateTask: {
    assignee: {
      attempting: 0,
      error: null,
    },
    status: {
      attempting: 0,
      error: null,
    },
    duration: {
      attempting: 0,
      error: null,
    },
  },
  deleteFromTask: {
    deleteTask: {
      attempting: 0,
      error: null,
      success: null,
    },
    deleteAssignee: {
      attempting: 0,
      error: null,
    },
  },
  tasks: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  newtask: {
    data: null,
    sync: {
      attempting: 0,
      error: null,
    },
  },
  deleteProject: {
    sync: {
      attempting: 0,
      error: null,
      success: null,
    },
  },
  projects: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  project: {
    data: null,
    sync: {
      attempting: 0,
      error: null,
    },
  },
  team: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  newteam: {
    data: null,
    sync: {
      attempting: 0,
      error: null,
    },
  },
  registrationsStatus: {
    attempting: 0,
    successMessage: null,
    errorMessage: null,
  },
  user: {
    data: null,
    sync: {
      attempting: 0,
      error: null,
    },
  },
  members: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  assignees: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  // form: {}
};

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'modalVisible',
    'newTarget',
    'targets',
    'updateTarget',
    'deleteTarget',
    'newDevice',
    'devices',
    'deleteDevice',
    'deleteEvent',
    'events',
    'event',
    'newRisk',
    'risks',
    'deleteRisk',
    'userById',
    'updateTask',
    'deleteFromTask',
    'tasks',
    'newtask',
    'deleteProject',
    'projects',
    'project',
    'team',
    'newteam',
    'registrationsStatus',
    'members',
    'assignees',
  ],
};

const persistConfig = {
  storage,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  modalVisible,
  newTarget,
  targets: persistReducer(
    {
      key: 'targets',
      ...persistConfig,
    },
    targets,
  ),
  updateTarget,
  deleteTarget,
  newDevice,
  devices: persistReducer(
    {
      key: 'devices',
      ...persistConfig,
    },
    devices,
  ),
  deleteDevice,
  deleteEvent,
  events: persistReducer(
    {
      key: 'events',
      ...persistConfig,
    },
    events,
  ),
  event,
  newRisk,
  risks,
  deleteRisk,
  userById,
  updateTask,
  deleteFromTask,
  tasks,
  newtask,
  deleteProject,
  projects: persistReducer(
    {
      key: 'projects',
      ...persistConfig,
    },
    projects,
  ),
  project,
  team,
  newteam,
  registrationsStatus: persistReducer(
    {
      key: 'registrationsStatus',
      ...persistConfig,
    },
    registrationsStatus,
  ),
  user: persistReducer(
    {
      key: 'user',
      ...persistConfig,
    },
    user,
  ),
  members: persistReducer(
    {
      key: 'members',
      ...persistConfig,
    },
    members,
  ),
  assignees,
  // form: formReducer
  // registerForm: formReducer,
  // loginForm: formReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)),
);
sagaMiddleware.run(sagas);
const persistor = persistStore(store);
// persistor.purge();
export { history };
export { store, persistor };
