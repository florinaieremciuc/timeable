import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  isAttempting as attemptCreate,
  eventPropType,
} from '../../../../State/Events/create/reducer';
import { getEventsAttempt } from '../../../../State/Events/get/actions';
import {
  getItems as getEvents,
  isAttempting as attemptGet,
} from '../../../../State/Events/get/reducer';
import { isAttempting as attemptDelete } from '../../../../State/Events/delete/reducer';

import { getTeam, getRole } from '../../../../State/Users/login/reducers';

import AddEvent from './components/AddEvent';
import ListEvents from './components/ListEvents';

import './styles.css';

class Events extends React.Component {
  componentWillMount() {
    const { teamid } = this.props;
    this.props.getEventsAttempt(teamid);
  }

  componentWillReceiveProps(nextProps) {
    const {
      loadCreate, loadDelete, loadGet, teamid,
    } = nextProps;
    if (loadCreate > 0 || loadDelete > 0 || loadGet > 0) {
      nextProps.getEventsAttempt(teamid);
    }
  }

  render() {
    const { teamid, events, role } = this.props;
    return (
      <div className="events">
        <h1>Events</h1>
        {role === 'teamlead' ? <AddEvent team={teamid} /> : null}
        <ListEvents events={events} role={role} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loadCreate: attemptCreate(state.event),
  events: getEvents(state.events),
  loadGet: attemptGet(state.events),
  loadDelete: attemptDelete(state.deleteEvent),
  teamid: getTeam(state.user),
  role: getRole(state.user),
});
export default connect(
  mapStateToProps,
  { getEventsAttempt },
)(Events);

Events.propTypes = {
  teamid: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(eventPropType).isRequired,
  getEventsAttempt: PropTypes.func.isRequired,
  loadCreate: PropTypes.number.isRequired,
  loadDelete: PropTypes.number.isRequired,
  loadGet: PropTypes.number.isRequired,
};
