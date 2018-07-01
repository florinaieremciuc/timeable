import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { getUsersTasksperProjectAttempt } from '../../../../State/Tasks/get/actions';
import {
  getItems as getTasks,
  isAttempting as loadingTasks,
} from '../../../../State/Tasks/get/reducer';
import { taskPropType } from '../../../../State/Tasks/create/reducer';

import { updateStatusAttempt, updateDurationAttempt } from '../../../../State/Tasks/update/actions';
import { isAttemptingStatus, isAttemptingDuration } from '../../../../State/Tasks/update/reducer';

import ListTasks from './components/ListTasks';
import './styles.css';

class Activities extends React.Component {
  componentWillMount() {
    const { params } = this.props;
    this.props.getUsersTasksperProjectAttempt(Number(params.user), Number(params.project));
  }

  componentWillReceiveProps(nextProps) {
    const { params, attemptDurationUpdate, attemptStatusUpdate } = nextProps;
    if (attemptDurationUpdate > 0 || attemptStatusUpdate > 0) {
      nextProps.getUsersTasksperProjectAttempt(params.user, params.project);
    }
  }

  render() {
    const { tasks, params } = this.props;
    return (
      <Container className="devices-overview">
        <h1>Tasks overview</h1>
        <Container>
          <ListTasks
            params={params}
            tasks={tasks}
            updateStatusAttempt={this.props.updateStatusAttempt}
            updateDurationAttempt={this.props.updateDurationAttempt}
          />
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tasks: getTasks(state.tasks),
  loadTasks: loadingTasks(state.tasks),
  attemptStatusUpdate: isAttemptingStatus(state.updateTask),
  attemptDurationUpdate: isAttemptingDuration(state.updateTask),
});
export default connect(
  mapStateToProps,
  {
    getUsersTasksperProjectAttempt,
    updateStatusAttempt,
    updateDurationAttempt,
  },
)(Activities);
Activities.propTypes = {
  params: PropTypes.shape({
    user: PropTypes.string,
    project: PropTypes.string.isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  getUsersTasksperProjectAttempt: PropTypes.func.isRequired,
  updateStatusAttempt: PropTypes.func.isRequired,
  updateDurationAttempt: PropTypes.func.isRequired,
  attemptStatusUpdate: PropTypes.number.isRequired,
  attemptDurationUpdate: PropTypes.number.isRequired,
};
