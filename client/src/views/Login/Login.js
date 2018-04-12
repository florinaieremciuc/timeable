import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";

import { loginAttempt } from "./actions";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChangeUsername(text) {
    this.setState({ username: text.target.value });
  }

  handleChangePassword(text) {
    this.setState({ password: text.target.value });
  }

  submit() {
    this.props.loginAttempt(this.state.username, this.state.password);
  }
  render() {
    return (
      <Form onSubmit={this.submit}>
        <Form.Group widths="equal">
          <Form.Field
            id="username"
            control={Input}
            label="Type in youur username"
            name="username"
            type="text"
            placeholder="Username"
            onChange={event => this.handleChangeUsername(event)}
            required
          />
          <Form.Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
            onChange={this.handleChangePassword}
            required
            id="password"
            control={Input}
            label="Fill out the password"
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

export default connect(null, { loginAttempt })(LoginForm);
