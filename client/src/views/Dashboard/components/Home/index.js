import React from 'react';
import { Container, Header, Card, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'react-moment';

import { deleteProjectAttempt } from '../../../../State/Projects/delete/actions';
import { isAttempting as isAttemptingDelete } from '../../../../State/Projects/delete/reducer';
import {
  getData,
  isAttempting as projectLoading,
  projectPropType,
} from '../../../../State/Projects/create/reducer';
import { getItems, isAttempting } from '../../../../State/Projects/get/reducer';
import {
  getProjectsAttempt,
  getUsersProjectsAttempt,
} from '../../../../State/Projects/get/actions';
import { getTeam, getRole, getUserId } from '../../../../State/Users/login/reducers';

import './style.css';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    const { role, teamid, user } = this.props;
    if (role === 'teamlead') {
      this.props.getProjectsAttempt(teamid);
    } else {
      this.props.getUsersProjectsAttempt(user);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((!_.isNil(nextProps.project) && _.isNil(nextProps.project.id)) || nextProps.loadDelete) {
      nextProps.getProjectsAttempt(nextProps.teamid);
    }
  }

  delete(id) {
    _.remove(this.props.projects, project => project.id === id);
    this.props.deleteProjectAttempt(id);
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
                    {role === 'teamlead' ? (
                      <Icon size="big" name="trash" onClick={() => this.delete(project.id)} />
                    ) : null}
                  </Card.Header>
                  <Card.Content extra>
                    {project.startDate ? (
                      <div>
                        <Icon name="calendar check outline" />
                        <Moment format="YYYY-MM-DD">{project.startDate}</Moment>
                      </div>
                    ) : null}
                    <Icon name="calendar times outline" />
                    <Moment format="YYYY-MM-DD">{project.deadline}</Moment>
                  </Card.Content>
                  <Card.Content description={project.description}>
                    <Link to={`/tasks/${project.id}`}>
                      <Button>Activity list</Button>
                    </Link>
                    <Link to={`/risks/${project.id}`}>
                      <Icon name="rain" />
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
  loadDelete: isAttemptingDelete(state.deleteProject),
  loading: isAttempting(state.projects),
  projects: getItems(state.projects),
  user: getUserId(state.user),
  teamid: getTeam(state.user),
  role: getRole(state.user),
});
export default connect(
  mapStateToProps,
  { getProjectsAttempt, getUsersProjectsAttempt, deleteProjectAttempt },
)(Projects);

Projects.propTypes = {
  project: projectPropType,
  projects: PropTypes.arrayOf(projectPropType).isRequired,
  getProjectsAttempt: PropTypes.func.isRequired,
  getUsersProjectsAttempt: PropTypes.func.isRequired,
  deleteProjectAttempt: PropTypes.func.isRequired,
  loadDelete: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
  teamid: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
};
Projects.defaultProps = {
  project: null,
};
