import React from 'react';
import { Card, Segment, List, Select, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { userPropType } from '../../../../../../State/Users/login/reducers';
import { taskPropType } from '../../../../../../State/Tasks/create/reducer';

const UsersTasks = (props) => {
  const { member, user, tasks } = props;

  const selectIcon = (task) => {
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
  };

  const selectStatus = (status) => {
    switch (status) {
    case 'to_do':
      return 'TO DO';
    case 'doing':
      return 'IN PROGRESS';
    case 'testing':
      return 'TESTING';
    case 'DONE':
      return 'DONE';
    default:
      return 'TO_DO';
    }
  };

  const handleChangeStatus = (event, data, taskId) => {
    if (data.value) props.updateStatusAttempt(taskId, data.value);
  };

  const updateStatus = (taskId, status, assignee, userid) => {
    if (assignee === userid) {
      return (
        <Select
          name="update-status"
          value={status}
          options={[
            { key: 0, text: 'IN PROGRESS', value: 'doing' },
            { key: 1, text: 'TESTING', value: 'testing' },
            { key: 2, text: 'DONE', value: 'done' },
          ]}
          onChange={(event, data) => handleChangeStatus(event, data, taskId)}
          required
        />
      );
    }
    return <div>Status: {selectStatus(status)}</div>;
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
                  <Popup
                    trigger={<List.Icon name={selectIcon(task).name} />}
                    content={selectIcon(task).text}
                  />
                  <List.Content>
                    <Popup
                      trigger={<List.Header>{task.name}</List.Header>}
                      content={task.description}
                    />
                    <div>{updateStatus(task.id, task.status, task.user_id, user.id)}</div>
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
