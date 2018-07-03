import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import { openModal, closeModal } from '../../../../components/Modal/action';

import { getRole, getUserId } from '../../../../State/Users/login/reducers';

import { updateTargetAttempt } from '../../../../State/Targets/update/actions';
import { isAttemptingTarget } from '../../../../State/Targets/update/reducer';
import { getTargetsAttempt } from '../../../../State/Targets/get/actions';
import {
  getItems as getTargets,
  isAttempting as loadingTargets,
} from '../../../../State/Targets/get/reducer';

import { getUsersTasksperProjectAttempt } from '../../../../State/Tasks/get/actions';
import { getItems as getTasks } from '../../../../State/Tasks/get/reducer';
import { taskPropType } from '../../../../State/Tasks/create/reducer';

import ListTargets from '../../../../components/Targets/components/ListTargets';
import TargetsChart from './components/TargetsChart';

import { isAttempting as loadDelete } from '../../../../State/Targets/delete/reducer';
import {
  targetPropType,
  isAttempting as loadCreate,
} from '../../../../State/Targets/create/reducer';

import './styles.css';

class Targets extends React.Component {
  componentWillMount() {
    const { projectid, user } = this.props;
    this.props.getTargetsAttempt(Number(projectid));
    this.props.getUsersTasksperProjectAttempt(user, Number(projectid));
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.loadCreate === 1 ||
      nextProps.loadDelete === 1 ||
      nextProps.loadUpdate === 1 ||
      nextProps.projectid !== this.props.projectid
    ) {
      nextProps.getTargetsAttempt(nextProps.projectid);
    }
  }
  render() {
    const {
      modalVisible, projectid, targets, role, tasks,
    } = this.props;
    const targetsToList = targets.filter(target => target.project === Number(projectid));
    return (
      <Container className="targets-overview">
        <h1>Targets overview</h1>
        <Container>
          {targets.length > 0 ? <TargetsChart targets={targets} /> : null}
          <ListTargets
            editable={false}
            open={modalVisible}
            project={projectid}
            targets={targetsToList}
            role={role}
            tasks={tasks}
            updateTarget={this.props.updateTargetAttempt}
          />
          {role === 'teamlead' ? (
            <Link to={`/targets/${projectid}`}>
              <Button>Edit targets</Button>
            </Link>
          ) : null}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.modalVisible,
  targets: getTargets(state.targets),
  loadingTargets: loadingTargets(state.targets),
  loadCreate: loadCreate(state.newTarget),
  loadUpdate: isAttemptingTarget(state.updateTarget),
  loadDelete: loadDelete(state.deleteTarget),
  role: getRole(state.user),
  user: getUserId(state.user),
  tasks: getTasks(state.tasks),
});
export default connect(
  mapStateToProps,
  {
    openModal,
    closeModal,
    getTargetsAttempt,
    getUsersTasksperProjectAttempt,
    updateTargetAttempt,
  },
)(Targets);

Targets.propTypes = {
  projectid: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  user: PropTypes.number.isRequired,
  getTargetsAttempt: PropTypes.func.isRequired,
  updateTargetAttempt: PropTypes.func.isRequired,
  targets: PropTypes.arrayOf(targetPropType).isRequired,
  loadCreate: PropTypes.number.isRequired,
  loadUpdate: PropTypes.number.isRequired,
  loadDelete: PropTypes.number.isRequired,
  getUsersTasksperProjectAttempt: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
};
