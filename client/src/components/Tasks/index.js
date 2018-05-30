import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react';

import { openModal, closeModal } from './action';
import AddTask from './components/AddTask';

import { getTasksAttempt } from '../../State/Tasks/get/actions';
import { getItems as getTasks, isAttempting as loadingTasks } from '../../State/Tasks/get/reducer';
import ListTasks from './components/ListTasks';

import { isAttempting as loadDelete } from '../../State/Tasks/delete/reducer';
import { taskPropType, isAttempting as loadCreate } from '../../State/Tasks/create/reducer';

class Tasks extends React.Component {
  componentWillMount() {
    console.log('project n tasks', this.props.project);
    this.props.getTasksAttempt(this.props.project);
  }
  componentWillReceiveProps(nextProps) {
    console.log('will receive props', this.props.project, nextProps.project);
    if (nextProps.loadCreate === 1 || nextProps.loadDelete === 1) {
      nextProps.getTasksAttempt(nextProps.project);
    }
  }
  render() {
    const open = this.props.modalVisible;
    const tasksToList = this.props.tasks.filter(task => task.project === this.props.project);
    console.log('render tasks', this.props.tasks);
    console.log('filtered tasks', tasksToList);
    return (
      <Modal open={open} onOpen={this.props.openModal} trigger={<Button>Activity list</Button>}>
        <Modal.Header>
          Activity list<Icon name="tasks" />
          <Icon name="close" onClick={this.props.closeModal} />
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <ListTasks open={open} project={this.props.project} tasks={tasksToList} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <AddTask project={this.props.project} />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.modalVisible,
  tasks: getTasks(state.tasks),
  loadingTasks: loadingTasks(state.tasks),
  loadCreate: loadCreate(state.newtask),
  loadDelete: loadDelete(state.deleteTask),
});
export default connect(mapStateToProps, { openModal, closeModal, getTasksAttempt })(Tasks);

Tasks.propTypes = {
  project: PropTypes.number.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  getTasksAttempt: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  loadCreate: PropTypes.number.isRequired,
  loadDelete: PropTypes.number.isRequired,
};
