import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Container, Header, Divider } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import { openModal, closeModal } from '../Modal/action';
import AddTask from './components/AddTask';

import { getTasksAttempt } from '../../State/Tasks/get/actions';
import { getItems as getTasks, isAttempting as loadingTasks } from '../../State/Tasks/get/reducer';

import { getTargetsAttempt } from '../../State/Targets/get/actions';
import { getItems as getTargets } from '../../State/Targets/get/reducer';
import { targetPropType } from '../../State/Targets/create/reducer';

import { getRisksAttempt } from '../../State/Risks/get/actions';
import { getItems as getRisks } from '../../State/Risks/get/reducer';
import { riskPropType } from '../../State/Risks/create/reducer';

import ListTasks from './components/ListTasks';

import { isAttemptingDeleteTask as loadDelete } from '../../State/Tasks/delete/reducer';
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
    const { projectid } = this.props.match.params;
    this.props.getTasksAttempt(projectid);
    this.props.getTargetsAttempt(projectid);
    this.props.getRisksAttempt(projectid);
    this.props.getMembersAttempt(this.props.teamid);
  }
  componentWillReceiveProps(nextProps) {
    const { projectid } = nextProps.match.params;
    if (
      nextProps.loadCreate === 1 ||
      nextProps.loadDelete === 1 ||
      projectid !== this.props.match.params.projectid
    ) {
      nextProps.getTasksAttempt(projectid);
    }
  }
  render() {
    const {
      modalVisible,
      match,
      members,
      loadingMembers,
      tasks,
      role,
      targets,
      risks,
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
        {role === 'teamlead' ? (
          <AddTask project={this.props.match.params.projectid} targets={targets} risks={risks} />
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.modalVisible,
  tasks: getTasks(state.tasks),
  loadingTasks: loadingTasks(state.tasks),
  loadCreate: loadCreate(state.newtask),
  loadDelete: loadDelete(state.deleteFromTask),
  loadingMembers: loadMembers(state.members),
  members: getMembers(state.members),
  teamid: getTeam(state.user),
  role: getRole(state.user),
  targets: getTargets(state.targets),
  risks: getRisks(state.risks),
});
export default connect(
  mapStateToProps,
  {
    openModal,
    closeModal,
    getTasksAttempt,
    getTargetsAttempt,
    getRisksAttempt,
    getMembersAttempt,
  },
)(Tasks);

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
  getMembersAttempt: PropTypes.func.isRequired,
  teamid: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  loadingMembers: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(userPropType).isRequired,
  getTargetsAttempt: PropTypes.func.isRequired,
  getRisksAttempt: PropTypes.func.isRequired,
  targets: PropTypes.arrayOf(targetPropType).isRequired,
  risks: PropTypes.arrayOf(riskPropType).isRequired,
};
