import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getAssignedTasksAttempt } from '../../../../State/Tasks/get/actions';
import {
  getItems as getTasks,
  isAttempting as loadingTasks,
} from '../../../../State/Tasks/get/reducer';
import { taskPropType } from '../../../../State/Tasks/create/reducer';

import { updateStatusAttempt } from '../../../../State/Tasks/update/actions';
import { isAttemptingStatus } from '../../../../State/Tasks/update/reducer';

import { getMembersAttempt } from '../../../../State/Users/team/actions';
import { getItems as getMembers } from '../../../../State/Users/team/reducer';

import { getUserData as getUser, userPropType } from '../../../../State/Users/login/reducers';

import AddMembers from './components/AddMembers';
import UsersTasks from './components/UsersTasks';
import './style.css';

class Teams extends React.Component {
  componentWillMount() {
    this.props.getAssignedTasksAttempt(this.props.user.team);
    this.props.getMembersAttempt(this.props.user.team);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.attemptStatusUpdate > 0) {
      this.props.getAssignedTasksAttempt(nextProps.user.team);
    }
  }

  render() {
    const { user, teamMembers, tasks } = this.props;
    return (
      <Container className="teams">
        <h1>Team</h1>
        <div className="members">
          {teamMembers.map(member => (
            <UsersTasks
              key={member.id}
              member={member}
              user={user}
              tasks={tasks}
              updateStatusAttempt={this.props.updateStatusAttempt}
            />
          ))}
        </div>

        {user.role === 'teamlead' && <AddMembers user={user} />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tasks: getTasks(state.tasks),
  loadTasks: loadingTasks(state.tasks),
  teamMembers: getMembers(state.members),
  user: getUser(state.user),
  attemptStatusUpdate: isAttemptingStatus(state.updateTask),
});
export default connect(
  mapStateToProps,
  {
    getMembersAttempt,
    getAssignedTasksAttempt,
    updateStatusAttempt,
  },
)(Teams);

Teams.defaultProps = {
  teamMembers: {},
};
Teams.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  user: userPropType.isRequired,
  getMembersAttempt: PropTypes.func.isRequired,
  getAssignedTasksAttempt: PropTypes.func.isRequired,
  updateStatusAttempt: PropTypes.func.isRequired,
  attemptStatusUpdate: PropTypes.number.isRequired,
  teamMembers: PropTypes.arrayOf(userPropType),
};
