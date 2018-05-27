import React from 'react';
import { Container, Header, Card, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { isAttempting as attemptDelete } from '../../../../State/Projects/delete/reducer';
import { deleteProjectAttempt } from '../../../../State/Projects/delete/actions';
import {
  getData,
  isAttempting as projectLoading,
  newProjectPropType,
} from '../../../../State/Projects/create/reducer';
import { getItems, isAttempting, projectsPropType } from '../../../../State/Projects/get/reducer';
import { getProjectsAttempt } from '../../../../State/Projects/get/actions';
import { getTeam } from '../../../../State/Users/login/reducers';
import CreateProject from '../CreateProjects';
import './style.css';

class Projects extends React.Component {
  componentWillMount() {
    this.props.getProjectsAttempt(this.props.teamid);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (!_.isNil(nextProps.project) && _.isNil(nextProps.project.id)) ||
      nextProps.attemptDelete === 1
    ) {
      nextProps.getProjectsAttempt(nextProps.teamid);
    }
    console.log('attemopt', nextProps.attemptDelete);
  }

  delete(id) {
    this.props.deleteProjectAttempt(id);
    this.props.getProjectsAttempt(this.props.teamid);
    console.log('attempt delete', this.props.attemptDelete);
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
                  <Card.Content>
                    <Icon name="trash" onClick={() => this.delete(project.id)} />
                    <Header content={project.name} />
                  </Card.Content>
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
        {/* <Container className="create-project">
          <Header>Create project</Header>
          <CreateProject />
        </Container> */}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  attemptDelete: attemptDelete(state.project),
  project: getData(state.project),
  loadingProject: projectLoading(state.project),
  loading: isAttempting(state.projects),
  projects: getItems(state.projects),
  teamid: getTeam(state.user),
});
export default connect(mapStateToProps, { getProjectsAttempt, deleteProjectAttempt })(Projects);

Projects.propTypes = {
  project: newProjectPropType,
  projects: PropTypes.arrayOf(projectsPropType).isRequired,
  getProjectsAttempt: PropTypes.func.isRequired,
  deleteProjectAttempt: PropTypes.func.isRequired,
  teamid: PropTypes.number.isRequired,
};
Projects.defaultProps = {
  project: null,
};
