import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Header, Icon, Divider } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';
import 'react-router-modal/css/react-router-modal.css';

import 'react-datepicker/dist/react-datepicker.css';
import { createProjectAttempt } from '../../State/Projects/create/actions';
import { getData } from '../../State/Projects/create/reducer';
import { getTeam } from '../../State/Users/login/reducers';

import './style.css';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      deadline: null,
      team: null,
      startDate: null,
      redirect: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeDeadline = this.handleChangeDeadline.bind(this);

    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    if (this.props.team) {
      this.setState({ team: this.props.team });
    }
  }

  handleChangeName(text) {
    this.setState({ name: text.target.value });
  }
  handleChangeDescription(text) {
    this.setState({ description: text.target.value });
  }
  handleChangeStartDate(date) {
    this.setState({ startDate: date });
  }
  handleChangeDeadline(date) {
    this.setState({ deadline: date });
  }

  async submit() {
    const {
      name, description, deadline, team, startDate,
    } = this.state;
    if (!_.isNil(this.state.name) && !_.isNil(this.state.deadline)) {
      this.setState({ redirect: !this.state.redirect });
      await this.props.createProjectAttempt(name, description, deadline, team, startDate);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Form onSubmit={this.submit}>
        <Header>
          Create a new project
          <Link to="/">
            <Icon name="close" />
          </Link>
        </Header>
        <Divider />
        <Form.Group widths="equal">
          <Form.Field
            id="name"
            control={Input}
            name="name"
            type="text"
            placeholder="Name *"
            onChange={event => this.handleChangeName(event)}
            required
          />
          <Form.Field
            id="description"
            control={Input}
            name="description"
            type="text"
            placeholder="Description"
            onChange={event => this.handleChangeDescription(event)}
          />
          <DatePicker
            required
            id="startDate"
            selected={this.state.startDate}
            onChange={this.handleChangeStartDate}
            minDate={moment()}
            placeholderText="Select the start date - optional"
          />
          <DatePicker
            required
            id="deadline"
            selected={this.state.deadline}
            onChange={this.handleChangeDeadline}
            minDate={_.isNil(this.state.startDate) ? moment() : this.state.startDate}
            placeholderText="Select the deadline *"
          />
          <Form.Field
            className="submit"
            control={Button}
            content="Send"
            id="submit"
            type="submit"
            compact
            onClick={this.submit}
          />
        </Form.Group>
      </Form>
    );
  }
}
const mapStateToProps = state => ({
  newproject: getData(state.project),
  team: getTeam(state.user),
});
export default connect(
  mapStateToProps,
  { createProjectAttempt },
)(CreateProject);

CreateProject.propTypes = {
  createProjectAttempt: PropTypes.func.isRequired,
  team: PropTypes.number.isRequired,
};
