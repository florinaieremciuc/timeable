import React from 'react';
import { Container, Header, Card, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteProjectAttempt } from '../../../../State/Projects/delete/actions';
import {
  getData,
  isAttempting as projectLoading,
  newProjectPropType,
} from '../../../../State/Projects/create/reducer';
import { getItems, isAttempting, projectsPropType } from '../../../../State/Projects/get/reducer';
import { getProjectsAttempt } from '../../../../State/Projects/get/actions';
import { getTeam, getRole } from '../../../../State/Users/login/reducers';

import './style.css';

class Projects extends React.Component {
  componentWillMount() {
    this.props.getProjectsAttempt(this.props.teamid);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isNil(nextProps.project) && _.isNil(nextProps.project.id)) {
      nextProps.getProjectsAttempt(nextProps.teamid);
    }
  }

  delete(id) {
    this.props.deleteProjectAttempt(id);
    _.remove(this.props.projects, project => project.id === id);
  }

  render() {
    const { projects, role } = this.props;
    return (
      <div className="projects">
        <h1>Projects List</h1>
        {role === 'teamlead' ? (
          <Link to="/projects/new">
            <Button>
              <Icon name="add" />Create project
            </Button>
          </Link>
        ) : null}
        <Container className="projects-list">
          {projects.map((project) => {
            if (project.id) {
              return (
                <Card key={project.id}>
                  <Card.Header>
                    <Header content={project.name} />
                    <Icon size="big" name="trash" onClick={() => this.delete(project.id)} />
                  </Card.Header>
                  <Card.Content extra>
                    <Icon name="calendar outline" />
                    {project.deadline}
                  </Card.Content>
                  <Card.Content description={project.description}>
                    <Link to={`/tasks/${project.id}`}>
                      <Button>Activity list</Button>
                    </Link>
                  </Card.Content>
                </Card>
              );
            }
            return null;
          })}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  project: getData(state.project),
  loadingProject: projectLoading(state.project),
  loading: isAttempting(state.projects),
  projects: getItems(state.projects),
  teamid: getTeam(state.user),
  role: getRole(state.user),
});
export default connect(mapStateToProps, { getProjectsAttempt, deleteProjectAttempt })(Projects);

Projects.propTypes = {
  project: newProjectPropType,
  projects: PropTypes.arrayOf(projectsPropType).isRequired,
  getProjectsAttempt: PropTypes.func.isRequired,
  deleteProjectAttempt: PropTypes.func.isRequired,
  teamid: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
};
Projects.defaultProps = {
  project: null,
};
