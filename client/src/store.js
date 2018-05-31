import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';

import sagas from './sagas';

// CRUD ops for tasks
import deleteTask from './State/Tasks/delete/reducer';
import tasks from './State/Tasks/get/reducer';
import newtask from './State/Tasks/create/reducer';

// CRUD ops for teams
import deleteProject from './State/Projects/delete/reducer';
import projects from './State/Projects/get/reducer';
import project from './State/Projects/create/reducer';

// CRud ops for teams
import teams from './State/Teams/get/reducer';
import team from './State/Teams/create/reducer';

// ops for user
import registrationsStatus from './State/Users/register/reducers';
import user from './State/Users/login/reducers';
import members from './State/Users/team/reducer';

import modalVisible from './components/Tasks/reducer';

const history = createHistory();
const defaultState = {
  modalVisible: false,
  deleteTask: {
    sync: {
      attempting: 0,
      error: null,
      success: null,
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
  teams: {
    items: [],
    sync: {
      attempting: 0,
      error: null,
    },
  },
  team: {
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
  // form: {}
};

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'modalVisible',
    'deleteTask',
    'tasks',
    'newtask',
    'deleteProject',
    'projects',
    'project',
    'teams',
    'team',
    'registrationsStatus',
    'members',
  ],
};

const persistConfig = {
  storage,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  modalVisible,
  deleteTask,
  tasks,
  newtask,
  deleteProject,
  projects,
  project,
  teams,
  team,
  registrationsStatus,
  user: persistReducer(
    {
      key: 'user',
      ...persistConfig,
    },
    user,
  ),
  members,
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
