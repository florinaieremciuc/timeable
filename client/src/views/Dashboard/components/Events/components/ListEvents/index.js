import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'react-moment';

import { deleteEventAttempt } from '../../../../../../State/Events/delete/actions';

import { eventPropType } from '../../../../../../State/Events/create/reducer';

// import './style.css';

class ListEvents extends React.Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  deleteEvent(id) {
    _.remove(this.props.events, event => event.id !== id);
    this.props.deleteEventAttempt(id);
  }

  render() {
    const { role, events } = this.props;
    return (
      <div>
        {events.length > 0 ? (
          <Table celled inverted selectable className="events-list">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Topic</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Details</Table.HeaderCell>
                <Table.HeaderCell>Place</Table.HeaderCell>
                <Table.HeaderCell>Extra</Table.HeaderCell>
                {role === 'teamlead' ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {events.map(event => (
                <Table.Row>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{event.name}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{event.topic}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>
                    <Moment parse="YYYY-MM-DD HH:mm">{event.date}</Moment>
                  </Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{event.details}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{event.place}</Table.Cell>
                  <Table.Cell style={{ textTransform: 'capitalize' }}>{event.extra}</Table.Cell>
                  {role === 'teamlead' ? (
                    <Table.Cell>
                      <Icon size="large" name="trash" onClick={() => this.deleteEvent(event.id)} />
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          'No events  '
        )}
      </div>
    );
  }
}
export default connect(
  null,
  { deleteEventAttempt },
)(ListEvents);

ListEvents.propTypes = {
  role: PropTypes.string.isRequired,
  deleteEventAttempt: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(eventPropType).isRequired,
};
