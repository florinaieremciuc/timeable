import React from 'react';
import { Container } from 'semantic-ui-react';

import Header from '../../components/Header';
import CreateTeamForm from './components/CreateTeam';
import './styles.css';

const CreateTeam = () => (
  <div>
    <Header />
    <Container className="create-team">
      <h1>Create team</h1>
      <CreateTeamForm />
    </Container>
  </div>
);

export default CreateTeam;
