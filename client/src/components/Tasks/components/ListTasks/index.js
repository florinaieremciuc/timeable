import React from 'react';
import { Segment, List, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteTaskAttempt } from '../../../../State/Tasks/delete/actions';

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
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   wantToDelete: false,
  //   //   toDelete: null,
  //   // };
  // }

  deleteTask(id) {
    // this.setState({ wantToDelete: true, toDelete: id });
    _.remove(this.props.tasks, task => task.id !== id);
    console.log('out', _.filter(this.props.tasks, task => task.id !== id));
    console.log('tasks', this.props.tasks);
    this.props.deleteTaskAttempt(id);
  }
  render() {
    console.log('props din list', this.props);
    // const tasks = this.props.tasks.slice();
    // tasks.slice(this.props.tasks);
    // if (this.state.wantToDelete) {
    //   _.remove(this.props.tasks, task => task.id === this.state.toDelete);
    //   this.setState({ wantToDelete: false, toDelete: null });
    // }
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
export default connect(null, { deleteTaskAttempt })(ListTasks);

ListTasks.propTypes = {
  deleteTaskAttempt: PropTypes.func.isRequired,
};
