import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { targetPropType } from '../../../../State/Targets/create/reducer';
import { taskPropType } from '../../../../State/Tasks/create/reducer';

import TargetItem from '../TargetItem';
import './style.css';

const ListTargets = (props) => {
  const {
    role, targets, editable, tasks,
  } = props;
  return (
    <div>
      {targets.length > 0 ? (
        <Table celled inverted selectable className="targets-list">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Achieved</Table.HeaderCell>
              {role === 'teamlead' && editable ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {targets.map(target => (
              <TargetItem role={role} target={target} tasks={tasks} editable={editable} />
            ))}
          </Table.Body>
        </Table>
      ) : (
        'No targets here man'
      )}
    </div>
  );
};
export default ListTargets;

ListTargets.propTypes = {
  role: PropTypes.string.isRequired,
  targets: PropTypes.arrayOf(targetPropType).isRequired,
  editable: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
};
