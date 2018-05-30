import React from 'react';
import { Segment, List, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getTasksAttempt } from '../../../../State/Tasks/get/actions';
import {
  getItems as getTasks,
  isAttempting as loadingTasks,
} from '../../../../State/Tasks/get/reducer';

import { deleteTaskAttempt } from '../../../../State/Tasks/delete/actions';
import { isAttempting as loadDelete } from '../../../../State/Tasks/delete/reducer';
import { taskPropType, isAttempting as loadCreate } from '../../../../State/Tasks/create/reducer';

// priority:
// 0 - idea
// 1 - thermometer half
// 2 - thermometer three quarters
// 3 - bug
const ListTasks = (props) => {
  const selectIcon = (task) => {
    switch (task.priority) {
    case '0':
      return 'idea';
    case '1':
      return 'thermometer half';
    case '2':
      return 'thermometer three quarters';
    case '3':
      return 'bug';
    default:
      return null;
    }
  };
  // componentWillMount() {
  //   console.log('project', this.props.project);
  //   this.props.getTasksAttempt(this.props.project);
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.loadCreate === 1 || nextProps.loadDelete === 1) {
  //     this.props.getTasksAttempt(this.props.project);
  //   }
  // }

  const deleteTask = (id) => {
    _.remove(props.tasks, task => task.id === id);
    props.deleteTaskAttempt(id);
  };
  // this.props.tasks.filter(task => task.project === this.props.project);
  console.log('props', props);
  return (
    <Segment inverted>
      {props.tasks.length > 0 ? (
        <List divided inverted relaxed>
          {props.tasks.map(task => (
            <List.Item key={task.id}>
              <List.Icon name={selectIcon(task)} />
              <List.Content>
                <List.Header>{task.name}</List.Header>
                {task.description}
              </List.Content>
              <Icon name="close" onClick={() => deleteTask(task.id)} />
            </List.Item>
          ))}
        </List>
      ) : (
        'No tasks here man'
      )}
    </Segment>
  );
};
// const mapStateToProps = state => ({
//   // tasks: getTasks(state.tasks),
//   // loadingTasks: loadingTasks(state.tasks),
//   // loadCreate: loadCreate(state.newtask),
//   // loadDelete: loadDelete(state.deleteTask),
// });
export default connect(null, { deleteTaskAttempt })(ListTasks);

ListTasks.propTypes = {
  // getTasksAttempt: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  deleteTaskAttempt: PropTypes.func.isRequired,
  project: PropTypes.number.isRequired,
  // loadCreate: PropTypes.number.isRequired,
  // loadDelete: PropTypes.number.isRequired,
};
