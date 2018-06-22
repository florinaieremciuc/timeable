import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { Loader } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './store';

import CreateProject from './components/CreateProjects';
import Tasks from './components/Tasks';
import App from './App/App';
import NewTeam from './views/NewTeam';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader active />} persistor={persistor}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/projects" component={App} />
            <Route exact path="/teams" component={App} />
            <Route exact path="/events" component={App} />
            <Route exact path="/new_team" component={NewTeam} />
            <Route exact path="/new_user/:teamId/:role" component={Register} />
            <Route path="/new_user/:teamId/:role/:encryptEmail" component={Register} />
            <Route exact path="/new_user/:teamId" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile/:userId" component={Profile} />
            <ModalRoute exact path="/tasks/:projectid" component={Tasks} parentPath="/" />
            <ModalRoute exact path="/projects/new" component={CreateProject} parentPath="/" />
          </Switch>
          <ModalContainer containerClassName="react-router-modal__container tasks" />
        </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
