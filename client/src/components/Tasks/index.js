import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Container, Header, Divider } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import { openModal, closeModal } from './action';
import AddTask from './components/AddTask';

import { getTasksAttempt } from '../../State/Tasks/get/actions';
import { getItems as getTasks, isAttempting as loadingTasks } from '../../State/Tasks/get/reducer';
import { isAttemptingAssignee } from '../../State/Tasks/update/reducer';

import ListTasks from './components/ListTasks';

import { isAttempting as loadDelete } from '../../State/Tasks/delete/reducer';
import { taskPropType, isAttempting as loadCreate } from '../../State/Tasks/create/reducer';

import { getMembersAttempt } from '../../State/Users/team/actions';
import {
  isAttempting as loadMembers,
  getItems as getMembers,
} from '../../State/Users/team/reducer';
import { getTeam, getRole, userPropType } from '../../State/Users/login/reducers';

import './style.css';

class Tasks extends React.Component {
  componentWillMount() {
    this.props.getTasksAttempt(this.props.match.params.projectid);
    this.props.getMembersAttempt(this.props.teamid);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loadCreate === 1 || nextProps.attemptUpdate === 1 || nextProps.loadDelete === 1) {
      nextProps.getTasksAttempt(nextProps.match.params.projectid);
    }
  }
  render() {
    const {
      modalVisible, match, members, loadingMembers, tasks, role,
    } = this.props;
    const tasksToList = tasks.filter(task => task.project === Number(match.params.projectid));

    return (
      <Container>
        <Header>
          <h1>
            <Icon name="tasks" />Activity list
          </h1>
          <Link to="/">
            <Icon name="close" />
          </Link>
        </Header>
        <Divider />
        <Container>
          <ListTasks
            open={modalVisible}
            project={match.params.projectid}
            tasks={tasksToList}
            members={members}
            loadMembers={loadingMembers}
          />
        </Container>
        {role === 'teamlead' ? <AddTask project={this.props.match.params.projectid} /> : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.modalVisible,
  tasks: getTasks(state.tasks),
  loadingTasks: loadingTasks(state.tasks),
  loadCreate: loadCreate(state.newtask),
  loadDelete: loadDelete(state.deleteTask),
  loadingMembers: loadMembers(state.members),
  attemptUpdate: isAttemptingAssignee(state.updateTask),
  members: getMembers(state.members),
  teamid: getTeam(state.user),
  role: getRole(state.user),
});
export default connect(mapStateToProps, {
  openModal,
  closeModal,
  getTasksAttempt,
  getMembersAttempt,
})(Tasks);

Tasks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  modalVisible: PropTypes.bool.isRequired,
  getTasksAttempt: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  loadCreate: PropTypes.number.isRequired,
  loadDelete: PropTypes.number.isRequired,
  attemptUpdate: PropTypes.number.isRequired,
  getMembersAttempt: PropTypes.func.isRequired,
  teamid: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  loadingMembers: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(userPropType).isRequired,
};
