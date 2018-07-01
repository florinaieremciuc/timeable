import React from 'react';
import { Segment, List, Icon, Dropdown, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteTaskAttempt, deleteAssigneeAttempt } from '../../../../State/Tasks/delete/actions';
import { isAttemptingDeleteAssignee, isAttemptingDeleteTask } from '../../../../State/Tasks/delete/reducer';
import { updateAssigneeAttempt } from '../../../../State/Tasks/update/actions';
import { isAttemptingAssignee } from '../../../../State/Tasks/update/reducer';

import { getAssigneesAttempt } from '../../../../State/Users/assignees/actions';
import { getItems as getAssignees } from '../../../../State/Users/assignees/reducer';

import { taskPropType } from '../../../../State/Tasks/create/reducer';
import { userPropType, getRole, getTeam } from '../../../../State/Users/login/reducers';

import Assignees from '../Assignees';

import './style.css';

// priority:
// 0 - idea
// 1 - thermometer half
// 2 - thermometer three quarters
// 3 - bug
class ListTasks extends React.Component {
  static selectIcon(task) {
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
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentWillMount() {
    this.props.getAssigneesAttempt(this.props.team);
  }

  componentWillReceiveProps(nextProps) {
    const { loadUpdate, loadDeteleTask, loadDeleteAssignee } = nextProps;
    if (loadUpdate > 0 || loadDeteleTask > 0 || loadDeleteAssignee > 0) {
      nextProps.getAssigneesAttempt(nextProps.team);
    }
  }

  handleChange(e, { value }, id) {
    this.props.updateAssigneeAttempt(id, value);
  }
  dropdown(task) {
    const { role, members } = this.props;
    if (members.length > 1) {
      if (role === 'teamlead') {
        const options = [];
        members.map((member, i) => {
          const option = {};
          option.key = i;
          option.text = member.first_name + ' ' + member.last_name + ' (' + member.role + ')';
          option.value = member.id;
          options.push(option);
          return null;
        });
        return (
          <Dropdown
            onChange={(e, { value, text }) => this.handleChange(e, { value, text }, task.id)}
            options={options}
            placeholder="Choose an option"
            selection
          />
        );
      }
    } else {
      return <Label>None</Label>;
    }
    return null;
  }
  deleteTask(id) {
    _.remove(this.props.tasks, task => task.id !== id);
    this.props.deleteTaskAttempt(id);
  }

  render() {
    const {
      role,
      tasks,
      assignees,
      members,
    } = this.props;

    return (
      <Segment inverted className="tasks-list">
        {tasks.length > 0 ? (
          <List divided inverted relaxed>
            {tasks.map(task => (
              <List.Item key={task.estimate}>
                <div className="task-details">
                  <List.Icon name={ListTasks.selectIcon(task)} />
                  Name:&nbsp;
                  <List.Header>
                    <Label>{task.name}</Label>
                  </List.Header>
                  {task.description &&
                    <List.Content>
                    Description:&nbsp;<strong>{task.description}</strong>
                    &nbsp;&nbsp;
                    </List.Content>}
                  {assignees.length > 0 && <Assignees
                    deleteAssignee={this.props.deleteAssigneeAttempt}
                    assignees={
                      assignees.length > 0 &&
                      assignees.filter(assignee => assignee.task_id === task.id)
                    }
                  />}
                  {assignees.length > 0 &&
                    assignees.filter(assignee =>
                      assignee.task_id === task.id).length === members.length
                    ? null
                    : this.dropdown(task)}
                </div>
                {role === 'teamlead' ? (
                  <Icon size="large" name="trash" onClick={() => this.deleteTask(task.id)} />
                ) : null}
              </List.Item>
            ))}
          </List>
        ) : (
          'No tasks here man'
        )}
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
  role: getRole(state.user),
  team: getTeam(state.user),
  assignees: getAssignees(state.assignees),
  loadUpdate: isAttemptingAssignee(state.updateTask),
  loadDeteleTask: isAttemptingDeleteTask(state.deleteFromTask),
  loadDeleteAssignee: isAttemptingDeleteAssignee(state.deleteFromTask)
});
export default connect(
  mapStateToProps,
  {
    deleteTaskAttempt,
    deleteAssigneeAttempt,
    updateAssigneeAttempt,
    getAssigneesAttempt,
  },
)(ListTasks);

ListTasks.propTypes = {
  role: PropTypes.string.isRequired,
  team: PropTypes.number.isRequired,
  deleteTaskAttempt: PropTypes.func.isRequired,
  deleteAssigneeAttempt: PropTypes.func.isRequired,
  updateAssigneeAttempt: PropTypes.func.isRequired,
  loadUpdate: PropTypes.number.isRequired,
  loadDeteleTask: PropTypes.number.isRequired,
  loadDeleteAssignee: PropTypes.number.isRequired,
  getAssigneesAttempt: PropTypes.func.isRequired,
  assignees: PropTypes.arrayOf(userPropType).isRequired,
  members: PropTypes.arrayOf(userPropType).isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
};
