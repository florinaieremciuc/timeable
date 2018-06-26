import React from 'react';
import { Card, Segment, List, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { userPropType } from '../../../../../../State/Users/login/reducers';
import { taskPropType } from '../../../../../../State/Tasks/create/reducer';

const UsersTasks = (props) => {
  const { member, user, tasks } = props;

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

  const selectStatus = (status) => {
    switch (status) {
    case 'to_do':
      return 'TO DO';
    case 'doing':
      return 'DOING';
    case 'testing':
      return 'TESTING';
    case 'DONE':
      return 'DONE';
    default:
      return null;
    }
  };

  const handleChangeStatus = (event, data, taskId) => {
    if (data.value) props.updateStatusAttempt(taskId, data.value);
  };

  const updateStatus = (taskId, status, assignee, userid) => {
    if (assignee === userid) {
      return (
        <Dropdown
          name="update-status"
          value={status}
          options={[
            { key: 0, text: 'DOING', value: 'doing' },
            { key: 1, text: 'TESTING', value: 'testing' },
            { key: 2, text: 'DONE', value: 'done' },
          ]}
          onChange={(event, data) => handleChangeStatus(event, data, taskId)}
          required
        />
      );
    }
    return <div>{selectStatus(status)}</div>;
  };

  const getUserTasks = id => tasks.filter(task => task.user_id === id);
  return (
    <Card key={member.id}>
      <Card.Header
        content={
          user.firstname === member.first_name &&
          user.lastname === member.last_name &&
          user.role === member.role
            ? 'My tasks'
            : member.first_name + ' ' + member.last_name + ' (' + member.role + ')'
        }
      />
      <Card.Content>
        <Segment inverted>
          {getUserTasks(member.id).length > 0 ? (
            <List divided inverted relaxed>
              <strong> Tasks: </strong>
              {getUserTasks(member.id).map(task => (
                <List.Item key={task.id}>
                  <List.Icon name={selectIcon(task)} />
                  <List.Content>
                    <List.Header>{task.name}</List.Header>
                    <div>{task.description}</div>
                    <div>{updateStatus(task.id, task.status, task.assignee, user.id)}</div>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          ) : (
            'No tasks here man'
          )}
        </Segment>
      </Card.Content>
    </Card>
  );
};
export default UsersTasks;

UsersTasks.defaultProps = {
  member: null,
};
UsersTasks.propTypes = {
  member: userPropType,
  user: userPropType.isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  updateStatusAttempt: PropTypes.func.isRequired,
};
