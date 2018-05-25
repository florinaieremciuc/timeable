import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import sagas from './sagas';
import projects from './State/Projects/get/reducer';
import project from './State/Projects/create/reducer';
import teams from './State/Teams/get/reducer';
import team from './State/Teams/create/reducer';
import registrationsStatus from './State/Users/register/reducers';
import user from './State/Users/login/reducers';

const history = createHistory();
const defaultState = {
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
  // form: {}
};

const rootReducer = combineReducers({
  projects,
  project,
  teams,
  team,
  registrationsStatus,
  user,
  // form: formReducer
  // registerForm: formReducer,
  // loginForm: formReducer
});

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  defaultState,
  applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)),
);
sagaMiddleware.run(sagas);
const persistor = persistStore(store);
persistor.purge();
export { history };
export { store, persistor };
