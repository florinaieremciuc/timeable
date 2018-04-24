import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { createTeamAttempt } from '../actions';
import { getId } from '../reducer';

class CreateTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      redirect: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newteamid) {
      this.setState({ redirect: !this.state.redirect });
    }
  }

  handleChangeName(text) {
    this.setState({ name: text.target.value });
  }

  async submit() {
    await this.props.createTeamAttempt(this.state.name);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/new_user/" />;
    }
    return (
      <Form onSubmit={this.submit}>
        <Form.Group widths="equal">
          <Form.Field
            id="name"
            control={Input}
            label="Type in team name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={event => this.handleChangeName(event)}
            required
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
  newteamid: getId(state.team),
});
export default connect(mapStateToProps, { createTeamAttempt })(CreateTeamForm);
