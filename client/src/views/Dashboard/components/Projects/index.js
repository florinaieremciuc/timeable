import React from 'react';
import { Container, Header, Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getItems, isAttempting, projectsPropType } from '../../../../State/Projects/get/reducer';
import { getProjectsAttempt } from '../../../../State/Projects/get/actions';
import { getTeam } from '../../../../State/Users/login/reducers';
import CreateProjectForm from './components/CreateProject';
import './style.css';

class Projects extends React.Component {
  componentWillMount() {
    this.props.getProjectsAttempt(this.props.teamid);
  }

  render() {
    const { projects } = this.props;

    return (
      <div className="projects">
        <Header>Projects List</Header>
        <Container className="projects-list">
          {projects.map((project) => {
            if (project.id) {
              return (
                <Card key={project.id}>
                  <Card.Content header={project.name} />
                  <Card.Content extra>
                    <Icon name="calendar outline" />
                    {project.deadline}
                  </Card.Content>
                  <Card.Content description={project.description} />
                </Card>
              );
            }
            return null;
          })}
        </Container>
        <Container className="create-project">
          <Header>Create project</Header>
          <CreateProjectForm />
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: isAttempting(state.projects),
  projects: getItems(state.projects),
  teamid: getTeam(state.user),
});
export default connect(mapStateToProps, { getProjectsAttempt })(Projects);

Projects.propTypes = {
  getProjectsAttempt: PropTypes.func.isRequired,
  teamid: PropTypes.number.isRequired,
};
