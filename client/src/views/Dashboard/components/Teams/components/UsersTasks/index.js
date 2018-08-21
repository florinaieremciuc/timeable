import React from 'react';
import { Card, Segment, List, Popup } from 'semantic-ui-react';
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
    case 'done':
      return 'DONE';
    default:
      return 'TO DO';
    }
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
                    <div>
                      Estimate: <strong>{task.estimate}</strong>
                    </div>
                    {task.duration && (
                      <div>
                        Duration: <strong>{task.duration}</strong>
                      </div>
                    )}
                    <div>
                      Status: <strong>{selectStatus(task.status)}</strong>
                    </div>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          ) : (
            'No tasks  '
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
};
