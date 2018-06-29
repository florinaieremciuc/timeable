import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { projectPropType } from '../../../../State/Projects/create/reducer';
import { getItems, isAttempting } from '../../../../State/Projects/get/reducer';
import {
  getProjectsAttempt,
  getUsersProjectsAttempt,
} from '../../../../State/Projects/get/actions';
import { getTeam, getRole, getUserId } from '../../../../State/Users/login/reducers';

import './style.css';

class Events extends React.Component {
  static allViews() {
    return Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
  }

  componentWillMount() {
    const { role, teamid, user } = this.props;
    if (role === 'teamlead') {
      this.props.getProjectsAttempt(teamid);
    } else {
      this.props.getUsersProjectsAttempt(user);
    }
  }

  render() {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
    const { projects } = this.props;
    const events = projects.map((project) => {
      const item = Object.assign({
        id: project.id,
        title: project.name,
        start: new Date(project.startDate),
        end: new Date(project.deadline),
      });
      return item;
    });
    return (
      <div className="events">
        <h1>Events List</h1>
        <BigCalendar
          events={events}
          step={60}
          showMultiDayTimes
          defaultDate={new Date()}
          views={Events.allViews}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: isAttempting(state.projects),
  projects: getItems(state.projects),
  user: getUserId(state.user),
  teamid: getTeam(state.user),
  role: getRole(state.user),
});
export default connect(
  mapStateToProps,
  { getProjectsAttempt, getUsersProjectsAttempt },
)(Events);

Events.propTypes = {
  projects: PropTypes.arrayOf(projectPropType).isRequired,
  getProjectsAttempt: PropTypes.func.isRequired,
  getUsersProjectsAttempt: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
  teamid: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
};
