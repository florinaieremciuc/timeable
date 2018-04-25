import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Segment } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getSuccess } from '../../../State/Users/login/reducers';
import { loginAttempt } from '../../../State/Users/login/actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({ redirect: !this.state.redirect });
    }
  }
  handleChangeUsername(text) {
    this.setState({ username: text.target.value });
  }

  handleChangePassword(text) {
    this.setState({ password: text.target.value });
  }

  async submit() {
    await this.props.loginAttempt(this.state.username, this.state.password, this.props.team);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/projects" />;
    }

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
        <Segment inverted>
          {"Don't have an account?"}&nbsp;
          <Link to={`/new_user/${this.props.team}`}>Register!</Link>
        </Segment>
      </Form>
    );
  }
}
const mapStateToProps = state => ({
  success: getSuccess(state.user),
});
export default connect(mapStateToProps, { loginAttempt })(LoginForm);
LoginForm.propTypes = {
  success: PropTypes.bool.isRequired,
  team: PropTypes.objectOf().isRequired,
  loginAttempt: PropTypes.func.isRequired,
};
