import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import _ from 'lodash';

import { projectPropType } from '../../../../State/Projects/create/reducer';
import {
  getAllProjects,
  getUsersProjects,
} from '../../../../State/Projects/get/reducer';
import { getProjectsAttempt, getUserProjectsAttempt } from '../../../../State/Projects/get/actions';

import { eventPropType } from '../../../../State/Events/create/reducer';
import { getItems as getEvents } from '../../../../State/Events/get/reducer';
import { getEventsAttempt } from '../../../../State/Events/get/actions';

import { getTeam, getRole, getUserId } from '../../../../State/Users/login/reducers';

import './style.css';

class Calendar extends React.Component {
  static allViews() {
    return Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
  }

  componentWillMount() {
    const { role, teamid, user } = this.props;
    this.props.getEventsAttempt(teamid);
    if (role === 'teamlead') {
      this.props.getProjectsAttempt(teamid);
    } else {
      this.props.getUserProjectsAttempt(user);
    }
  }

  render() {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
    const {
      projects, userProjects, events, role,
    } = this.props;
    const projectsToUse = role === 'teamlead' ? projects : userProjects;
    const projectEvents = projectsToUse.map((project) => {
      const item = Object.assign({
        id: project.id,
        title: project.name,
        start: new Date(project.startDate),
        end: new Date(project.deadline),
      });
      return item;
    });
    const calendarEvents = events.map((event) => {
      const item = Object.assign({
        id: event.id,
        title: event.name,
        start: new Date(event.date),
        end: new Date(event.date),
      });
      return item;
    });

    return (
      <div className="calendar">
        <h1>Calendar</h1>
        <BigCalendar
          popup
          events={_.concat(projectEvents, calendarEvents)}
          step={60}
          showMultiDayTimes
          defaultDate={new Date()}
          views={Calendar.allViews}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  projects: getAllProjects(state.projects),
  userProjects: getUsersProjects(state.projects),
  user: getUserId(state.user),
  teamid: getTeam(state.user),
  role: getRole(state.user),
  events: getEvents(state.events),
});
export default connect(
  mapStateToProps,
  { getProjectsAttempt, getUserProjectsAttempt, getEventsAttempt },
)(Calendar);

Calendar.propTypes = {
  projects: PropTypes.arrayOf(projectPropType).isRequired,
  userProjects: PropTypes.arrayOf(projectPropType).isRequired,
  getProjectsAttempt: PropTypes.func.isRequired,
  getUserProjectsAttempt: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
  teamid: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(eventPropType).isRequired,
  getEventsAttempt: PropTypes.func.isRequired,
};
