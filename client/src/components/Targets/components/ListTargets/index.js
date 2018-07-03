import React from 'react';
import { Icon, Table, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteTargetAttempt } from '../../../../State/Targets/delete/actions';
import { targetPropType } from '../../../../State/Targets/create/reducer';
import { taskPropType } from '../../../../State/Tasks/create/reducer';

import './style.css';

class ListTargets extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTarget = this.deleteTarget.bind(this);
    this.updateAchieved = this.updateAchieved.bind(this);
  }

  deleteTarget(id) {
    _.remove(this.props.targets, target => target.id !== id);
    this.props.deleteTargetAttempt(id);
  }

  updateAchieved(target) {
    const { tasks } = this.props;
    const tasksTarget = tasks.filter(task => task.target === target.id);
    if (tasksTarget && tasksTarget.length > 0) {
      const doneTasks =
        tasksTarget.length > 0 &&
        tasksTarget.filter(task => task.status === 'done');
      if (tasksTarget.length === doneTasks.length) {
        this.props.updateTarget(target.id, 1);
      }
    }
  }

  render() {
    const { role, targets, editable } = this.props;
    return (
      <div>
        {targets.length > 0 ? (
          <Table celled inverted selectable className="targets-list">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Achieved</Table.HeaderCell>
                {role === 'teamlead' && editable ? (
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                ) : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {targets.map((target) => {
                this.updateAchieved(target);
                return (
                  <Table.Row>
                    <Table.Cell style={{ textTransform: 'capitalize' }}>
                      {target.description}
                    </Table.Cell>
                    <Table.Cell style={{ textTransform: 'capitalize' }}>
                      <Checkbox readOnly checked={target.achieved} />
                    </Table.Cell>
                    {role === 'teamlead' && editable ? (
                      <Table.Cell>
                        <Icon
                          size="large"
                          name="trash"
                          onClick={() => this.deleteTarget(target.id)}
                        />
                      </Table.Cell>
                    ) : null}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          'No targets here man'
        )}
      </div>
    );
  }
}
export default connect(
  null,
  { deleteTargetAttempt },
)(ListTargets);

ListTargets.propTypes = {
  role: PropTypes.string.isRequired,
  deleteTargetAttempt: PropTypes.func.isRequired,
  targets: PropTypes.arrayOf(targetPropType).isRequired,
  editable: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  updateTarget: PropTypes.func.isRequired,
};
