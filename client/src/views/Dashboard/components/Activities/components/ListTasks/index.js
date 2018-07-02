import React from 'react';
import { Icon, Table, Select, Popup, Form, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { taskPropType } from '../../../../../../State/Tasks/create/reducer';

class ListTasks extends React.Component {
  static selectIcon(task) {
    switch (task.priority) {
    case '0':
      return { name: 'idea', text: 'Low priority' };
    case '1':
      return { name: 'thermometer half', text: 'Moderate priority' };
    case '2':
      return { name: 'thermometer three quarters', text: 'Medium priority' };
    case '3':
      return { name: 'bug', text: 'High priority' };
    default:
      return null;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      duration: null,
    };

    this.updateDuration = this.updateDuration.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  updateStatus(taskId, status) {
    if (status !== 'done') {
      return (
        <Select
          name="update-status"
          value={status}
          options={[
            { key: 0, text: 'IN PROGRESS', value: 'doing' },
            { key: 1, text: 'TESTING', value: 'testing' },
            { key: 2, text: 'DONE', value: 'done' },
          ]}
          onChange={(event, data) => this.handleChangeStatus(event, data, taskId)}
          required
        />
      );
    }
    return 'DONE';
  }

  updateDuration(task) {
    if (task.duration.length === 0) {
      if (task.status === 'done') {
        return (
          <Form>
            <Form.Field
              required
              control={Input}
              name="duration"
              type="text"
              placeholder="Add duration"
              onChange={(event) => {
                this.setState({ duration: event.target.value });
              }}
            />
            <Form.Button icon="check" onClick={() => this.handleChangeDuration(task.id)} />
          </Form>
        );
      }
      return '-';
    }
    return task.duration;
  }

  handleChangeStatus(event, data, taskId) {
    if (data.value) this.props.updateStatusAttempt(taskId, data.value);
  }
  handleChangeDuration(taskId) {
    if (this.state.duration) this.props.updateDurationAttempt(taskId, this.state.duration);
  }

  render() {
    const { tasks } = this.props;
    return (
      <div>
        {tasks.length > 0 ? (
          <Table celled inverted selectable className="tasks-list">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Estimane</Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Priority</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tasks.map(task => (
                <Table.Row key={task.id}>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{task.name}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>
                    {task.description ? task.description : '-'}
                  </Table.Cell>
                  <Table.Cell>{task.estimate}</Table.Cell>
                  <Table.Cell>{this.updateDuration(task)}</Table.Cell>
                  <Table.Cell>{this.updateStatus(task.id, task.status)}</Table.Cell>
                  <Table.Cell>
                    <Popup
                      trigger={<Icon name={ListTasks.selectIcon(task).name} />}
                      content={ListTasks.selectIcon(task).text}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          'No tasks here man'
        )}
      </div>
    );
  }
}
export default ListTasks;

ListTasks.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  updateDurationAttempt: PropTypes.func.isRequired,
  updateStatusAttempt: PropTypes.func.isRequired,
};
