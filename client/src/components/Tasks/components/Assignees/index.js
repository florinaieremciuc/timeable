import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { userPropType } from '../../../../State/Users/login/reducers';

import './styles.css';

const Assignees = (props) => {
  const { assignees, role } = props;
  const removeAssignee = (task, assignee) => {
    _.remove(assignees, item => item.id !== assignee);
    props.deleteAssignee(task, assignee);
  };
  return (
    <div className="assignees">
      Assignees:&nbsp;{assignees.length > 0
        ? assignees.map(assignee =>
          assignee && (
            <Label key={assignee.id}>
              {assignee.first_name + ' ' + assignee.last_name + ' (' + assignee.role + ')'}
              {role === 'teamlead' && (
                <Icon
                  name="close"
                  onClick={() => removeAssignee(assignee.task_id, assignee.id)}
                />
              )}
            </Label>
          ))
        : null}
    </div>
  );
};
export default Assignees;
Assignees.propTypes = {
  assignees: PropTypes.arrayOf(userPropType).isRequired,
  deleteAssignee: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
