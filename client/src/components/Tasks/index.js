import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Container, Header } from 'semantic-ui-react';
import 'react-router-modal/css/react-router-modal.css';

import { openModal, closeModal } from './action';
import AddTask from './components/AddTask';

import { getTasksAttempt } from '../../State/Tasks/get/actions';
import { getItems as getTasks, isAttempting as loadingTasks } from '../../State/Tasks/get/reducer';
import ListTasks from './components/ListTasks';

import { isAttempting as loadDelete } from '../../State/Tasks/delete/reducer';
import { taskPropType, isAttempting as loadCreate } from '../../State/Tasks/create/reducer';

import './style.css';

class Tasks extends React.Component {
  componentWillMount() {
    this.props.getTasksAttempt(this.props.match.params.projectid);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('will receive props', nextProps);
    if (nextProps.loadCreate === 1) {
      nextProps.getTasksAttempt(nextProps.match.params.projectid);
    }
  }
  render() {
    const open = this.props.modalVisible;
    const tasksToList = this.props.tasks.filter(task => task.project === Number(this.props.match.params.projectid));
    // console.log('props', this.props);
    // console.log('projectid', this.props.match.params.projectid);
    // console.log('tasks', this.props.tasks);
    // console.log('filtered tasks', tasksToList);
    return (
      <Container>
        <Header>
          Activity list<Icon name="tasks" />
          <Link to="/">
            <Icon name="close" />
          </Link>
        </Header>
        <Container>
          <ListTasks open={open} project={this.props.match.params.projectid} tasks={tasksToList} />
        </Container>
        <AddTask project={this.props.match.params.projectid} />
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
});
export default connect(mapStateToProps, { openModal, closeModal, getTasksAttempt })(Tasks);

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
};
