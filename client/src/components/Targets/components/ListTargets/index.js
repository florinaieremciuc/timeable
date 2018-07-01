import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteTargetAttempt } from '../../../../State/Targets/delete/actions';

import { targetPropType } from '../../../../State/Targets/create/reducer';

import './style.css';

class ListTargets extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTarget = this.deleteTarget.bind(this);
  }

  deleteTarget(id) {
    _.remove(this.props.targets, target => target.id !== id);
    this.props.deleteTargetAttempt(id);
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
                {role === 'teamlead' && editable ? (
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                ) : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {targets.map(target => (
                <Table.Row>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>
                    {target.description}
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
              ))}
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
};
