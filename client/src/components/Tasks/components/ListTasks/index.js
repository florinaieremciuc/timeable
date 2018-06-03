import React from 'react';
import { Segment, List, Icon, Dropdown, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteTaskAttempt } from '../../../../State/Tasks/delete/actions';
import { updateAssigneeAttempt } from '../../../../State/Tasks/update/actions';

import { taskPropType } from '../../../../State/Tasks/create/reducer';
import { userPropType, getRole } from '../../../../State/Users/login/reducers';

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
    this.getAssignee = this.getAssignee.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  getAssignee(id) {
    return this.props.members.filter(member => member.id === id);
  }
  handleChange(e, { value }, id) {
    this.props.updateAssigneeAttempt(id, value);
  }
  dropdown(task) {
    const { role, members } = this.props;
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
    return <Label>None</Label>;
  }
  deleteTask(id) {
    _.remove(this.props.tasks, task => task.id !== id);
    this.props.deleteTaskAttempt(id);
  }

  render() {
    const { role } = this.props;

    return (
      <Segment inverted>
        {this.props.tasks.length > 0 ? (
          <List divided inverted relaxed>
            {this.props.tasks.map(task => (
              <List.Item key={task.id}>
                <div className="task-details">
                  <List.Icon name={ListTasks.selectIcon(task)} />
                  Name:&nbsp;
                  <List.Header>
                    <Label>{task.name}</Label>
                  </List.Header>
                  <List.Content>
                    Description:&nbsp;<strong>{task.description}</strong>
                    &nbsp;&nbsp;
                  </List.Content>
                  Assignee:&nbsp;{task.assignee ? (
                    <Label>
                      {this.getAssignee(task.assignee).length > 0 &&
                        this.getAssignee(task.assignee)[0].first_name +
                          ' ' +
                          this.getAssignee(task.assignee)[0].last_name +
                          ' (' +
                          this.getAssignee(task.assignee)[0].role +
                          ')'}
                    </Label>
                  ) : (
                    this.dropdown(task)
                  )}
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
});
export default connect(mapStateToProps, { deleteTaskAttempt, updateAssigneeAttempt })(ListTasks);

ListTasks.propTypes = {
  role: PropTypes.string.isRequired,
  deleteTaskAttempt: PropTypes.func.isRequired,
  updateAssigneeAttempt: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(userPropType).isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
};
