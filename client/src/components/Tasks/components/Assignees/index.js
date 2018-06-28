import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { userPropType } from '../../../../State/Users/login/reducers';

import './styles.css';

const Assignees = (props) => {
  const { assignees } = props;
  return (
    <div className="assignees">
      Assignees:&nbsp;{assignees.length > 0
        ? assignees.map(assignee =>
          assignee && (
            <Label key={assignee.id}>
              {assignee.first_name + ' ' + assignee.last_name + ' (' + assignee.role + ')'}
              <Icon name="close" />
            </Label>
          ))
        : null}
    </div>
  );
};
export default Assignees;
Assignees.propTypes = {
  assignees: PropTypes.arrayOf(userPropType).isRequired,
};
