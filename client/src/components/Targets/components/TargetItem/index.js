import React from 'react';
import { Icon, Table, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteTargetAttempt } from '../../../../State/Targets/delete/actions';
import { targetPropType } from '../../../../State/Targets/create/reducer';
import { taskPropType } from '../../../../State/Tasks/create/reducer';

class TargetItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTarget = this.deleteTarget.bind(this);
    this.updateAchieved = this.updateAchieved.bind(this);
  }

  componentWillMount() {
    this.updateAchieved(this.props.target);
  }

  deleteTarget(id) {
    this.props.deleteTargetAttempt(id);
  }

  updateAchieved(target) {
    const { tasks } = this.props;
    const tasksTarget = tasks && tasks.filter(task => task.target === target.id);
    if (tasksTarget && tasksTarget.length > 0) {
      const doneTasks =
        tasksTarget.length > 0 && tasksTarget.filter(task => task.status === 'done');
      if (tasksTarget.length === doneTasks.length) {
        this.props.updateTarget(target.id, 1);
      }
    }
  }

  render() {
    const { role, target, editable } = this.props;
    return (
      <Table.Row>
        <Table.Cell style={{ textTransform: 'capitalize' }}>{target.description}</Table.Cell>
        <Table.Cell style={{ textTransform: 'capitalize' }}>
          <Checkbox readOnly checked={target.achieved} />
        </Table.Cell>
        {role === 'teamlead' && editable ? (
          <Table.Cell>
            <Icon size="large" name="trash" onClick={() => this.deleteTarget(target.id)} />
          </Table.Cell>
        ) : null}
      </Table.Row>
    );
  }
}
export default connect(
  null,
  { deleteTargetAttempt },
)(TargetItem);

TargetItem.propTypes = {
  role: PropTypes.string.isRequired,
  deleteTargetAttempt: PropTypes.func.isRequired,
  target: targetPropType.isRequired,
  editable: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  updateTarget: PropTypes.func.isRequired,
};
