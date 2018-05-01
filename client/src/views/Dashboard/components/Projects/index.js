import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import CreateProjectForm from './components/CreateProject';
import './style.css';

class Projects extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Container className="create-team">
          <h1>Create project</h1>
          <CreateProjectForm />
        </Container>
      </div>
    );
  }
}

export default Projects;
