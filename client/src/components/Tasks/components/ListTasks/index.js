import React from 'react';
import { Segment, List, Icon, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteTaskAttempt } from '../../../../State/Tasks/delete/actions';

import { updateAssigneeAttempt } from '../../../../State/Tasks/update/actions';

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
    // this.state = {
    //   wantToDelete: false,
    //   toDelete: null,
    // };
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  handleChange(e, { value }, id) {
    this.props.updateAssigneeAttempt(id, value);
  }
  deleteTask(id) {
    // this.setState({ wantToDelete: true, toDelete: id });
    _.remove(this.props.tasks, task => task.id !== id);
    // console.log('out', _.filter(this.props.tasks, task => task.id !== id));
    // console.log('tasks', this.props.tasks);
    this.props.deleteTaskAttempt(id);
  }
  render() {
    // console.log('props din list', this.props);
    // const tasks = this.props.tasks.slice();
    // tasks.slice(this.props.tasks);
    // if (this.state.wantToDelete) {
    //   _.remove(this.props.tasks, task => task.id === this.state.toDelete);
    //   this.setState({ wantToDelete: false, toDelete: null });
    // }

    // const options = this.props.loadMembers === 0 && this.props.members.slice();
    const options = [];
    this.props.members.map((member, i) => {
      const option = {};
      option.key = i;
      option.text = member.first_name + ' ' + member.last_name + ' (' + member.role + ')';
      option.value = member.id;
      options.push(option);
      return null;
    });

    return (
      <Segment inverted>
        {this.props.tasks.length > 0 ? (
          <List divided inverted relaxed>
            {this.props.tasks.map(task => (
              <List.Item key={task.id}>
                <List.Icon name={ListTasks.selectIcon(task)} />
                <List.Content>
                  <List.Header>{task.name}</List.Header>
                  {task.description}
                </List.Content>
                <Icon name="close" onClick={() => this.deleteTask(task.id)} />
                <Dropdown
                  onChange={(e, { value }) => this.handleChange(e, { value }, task.id)}
                  options={options}
                  placeholder="Choose an option"
                  selection
                />
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
export default connect(null, { deleteTaskAttempt, updateAssigneeAttempt })(ListTasks);

ListTasks.propTypes = {
  deleteTaskAttempt: PropTypes.func.isRequired,
};
