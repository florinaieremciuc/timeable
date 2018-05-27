import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import { createProjectAttempt } from '../../../../State/Projects/create/actions';
import { getData, newProjectPropType } from '../../../../State/Projects/create/reducer';
import { getTeam } from '../../../../State/Users/login/reducers';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      deadline: null,
      team: null,
      redirect: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
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
  handleChangeDeadline(date) {
    this.setState({ deadline: date });
  }

  async submit() {
    const {
      name, description, deadline, team,
    } = this.state;
    this.setState({ redirect: !this.state.redirect });
    await this.props.createProjectAttempt(name, description, deadline, team);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Form onSubmit={this.submit}>
        <Form.Group widths="equal">
          <Form.Field
            id="name"
            control={Input}
            label="Type in the project name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={event => this.handleChangeName(event)}
            required
          />
          <Form.Field
            id="description"
            control={Input}
            label="Type in the description"
            name="description"
            type="text"
            placeholder="Description"
            onChange={event => this.handleChangeDescription(event)}
          />
          <DatePicker
            id="deadline"
            selected={this.state.deadline}
            onChange={this.handleChangeDeadline}
            minDate={moment()}
            placeholderText="Select the deadline"
          />
        </Form.Group>
        <Form.Field
          control={Button}
          content="Send"
          id="submit"
          type="submit"
          color="teal"
          compact
          onClick={this.submit}
        />
      </Form>
    );
  }
}
const mapStateToProps = state => ({
  newproject: getData(state.project),
  team: getTeam(state.user),
});
export default connect(mapStateToProps, { createProjectAttempt })(CreateProject);

CreateProject.propTypes = {
  createProjectAttempt: PropTypes.func.isRequired,
  team: PropTypes.number.isRequired,
  // newproject: newProjectPropType.isRequired,
};
