import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './store';

import App from './App/App';
import NewTeam from './views/NewTeam';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader active />} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/new_team" component={NewTeam} />
          <Route exact path="/new_user/:teamId/:role" component={Register} />
          <Route exact path="/new_user/:teamId" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/projects" component={App} />
          <Route exact path="/teams" component={App} />
          <Route exact path="/events" component={App} />
          <Route exact path="/profile/:userId" component={Profile} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
