import React from 'react';
import { Segment, List, Icon, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { deleteRiskAttempt } from '../../../../State/Risks/delete/actions';

import { riskPropType } from '../../../../State/Risks/create/reducer';

import './style.css';

// priority:
// 0 - idea
// 1 - thermometer half
// 2 - thermometer three quarters
// 3 - bug
class ListRisks extends React.Component {
  static selectIcon(risk) {
    switch (risk.priority) {
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
      <Segment inverted className="risks-list">
        {risks.length > 0 ? (
          <List divided inverted relaxed>
            {risks.map(risk => (
              <List.Item key={risk.id}>
                <div className="risk-details">
                  <List.Icon name={ListRisks.selectIcon(risk)} />
                  Name:&nbsp;
                  <List.Header>
                    <Label>{risk.description}</Label>
                  </List.Header>
                  <List.Content>
                    Description:&nbsp;<strong>{risk.description}</strong>
                    &nbsp;&nbsp;
                  </List.Content>
                  {/*                  Assignee:&nbsp;{risk.assignees.length > 0 ? (
                    risk.assignees.map(assignee => (
                      assignee[0] &&
                      <Label key={assignee[0].id}>
                        {
                          assignee[0].first_name +
                          ' ' +
                          assignee[0].last_name +
                          ' (' +
                          assignee[0].role +
                          ')'}
                      </Label>
                    ))
                  ) : (
                    null
                  )}
                */}
                </div>
                {role === 'teamlead' ? (
                  <Icon size="large" name="trash" onClick={() => this.deleteRisk(risk.id)} />
                ) : null}
              </List.Item>
            ))}
          </List>
        ) : (
          'No risks here man'
        )}
      </Segment>
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
