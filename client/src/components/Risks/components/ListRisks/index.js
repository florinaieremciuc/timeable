import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteRiskAttempt } from '../../../../State/Risks/delete/actions';

import { riskPropType } from '../../../../State/Risks/create/reducer';

import './style.css';

/** probability
 * 1 - unlikely to occur
 * 2 - may or may not occur
 * 3 - likely to occur
/** impact
 * 1 - minimal
 * 2 - moderate
 * 3 - significant
 */
class ListRisks extends React.Component {
  static selectText(risk, check) {
    switch (risk) {
    case '1':
      return check ? 'Unlikely to occur' : 'Minimal';
    case '2':
      return check ? 'May or may not occur' : 'Moderate';
    case '3':
      return check ? 'Likely to occur' : 'Significant';
    default:
      return null;
    }
  }
  constructor(props) {
    super(props);
    this.deleteRisk = this.deleteRisk.bind(this);
  }

  deleteRisk(id) {
    _.remove(this.props.risks, risk => risk.id !== id);
    this.props.deleteRiskAttempt(id);
  }

  render() {
    const { role, risks } = this.props;
    return (
      <div>
        {risks.length > 0 ? (
          <Table celled inverted selectable className="risks-list">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Probability</Table.HeaderCell>
                <Table.HeaderCell>Impact</Table.HeaderCell>
                <Table.HeaderCell>Response</Table.HeaderCell>
                {role === 'teamlead' ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {risks.map(risk => (
                <Table.Row>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>
                    {risk.description}
                  </Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{risk.category}</Table.Cell>
                  <Table.Cell>{ListRisks.selectText(risk.probability, true)}</Table.Cell>
                  <Table.Cell>{ListRisks.selectText(risk.impact)}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{risk.response}</Table.Cell>
                  {role === 'teamlead' ? (
                    <Table.Cell>
                      <Icon size="large" name="trash" onClick={() => this.deleteRisk(risk.id)} />
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          'No risks here man'
        )}
      </div>
    );
  }
}
export default connect(
  null,
  { deleteRiskAttempt },
)(ListRisks);

ListRisks.propTypes = {
  role: PropTypes.string.isRequired,
  deleteRiskAttempt: PropTypes.func.isRequired,
  risks: PropTypes.arrayOf(riskPropType).isRequired,
};
