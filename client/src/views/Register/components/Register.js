import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { registerAttempt } from '../../../State/Users/register/actions';

// IMPORTANT - rm / from enc-base64 crypto-js script -- routes bug
const CryptoJS = require('crypto-js');

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      confirmpass: null,
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      redirect: false,
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleChangeConfirmPassword(event) {
    this.setState({ confirmpass: event.target.value });
  }
  handleChangeFirstName(event) {
    this.setState({ firstname: event.target.value });
  }
  handleChangeLastName(event) {
    this.setState({ lastname: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangePhone(event) {
    this.setState({ phone: event.target.value });
  }
  async submit() {
    const {
      username, password, confirmpass, firstname, lastname, email, phone,
    } = this.state;
    const { encryptEmail, role, teamId } = this.props.params;

    if (
      !_.isNil(username) ||
      !_.isNil(password) ||
      !_.isNil(firstname) ||
      !_.isNil(lastname) ||
      !_.isNil(email) ||
      !_.isNil(phone)
    ) {
      if (password === confirmpass) {
        // Decrypt
        let decryptedEmail;
        if (encryptEmail) {
          const bytes = CryptoJS.AES.decrypt(encryptEmail.toString(), role);
          decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
        }

        await this.props.registerAttempt(
          username,
          password,
          firstname,
          lastname,
          encryptEmail ? decryptedEmail : email,
          phone,
          role || 'teamlead',
          teamId,
        );

        this.setState({ redirect: true });
      } else {
        alert('Passwords must match');
      }
    }
    return null;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <Form onSubmit={this.submit}>
        <Form.Field
          id="username"
          control={Input}
          name="username"
          type="text"
          placeholder="Username *"
          onChange={event => this.handleChangeUsername(event)}
          required
        />
        <Form.Field
          id="firstname"
          control={Input}
          name="firstname"
          type="text"
          placeholder="First name *"
          onChange={event => this.handleChangeFirstName(event)}
          required
        />
        <Form.Field
          id="lastname"
          control={Input}
          name="lastname"
          type="text"
          placeholder="Last name *"
          onChange={event => this.handleChangeLastName(event)}
          required
        />
        {!this.props.params.encryptEmail && (
          <Form.Field
            id="email"
            control={Input}
            name="email"
            type="email"
            placeholder="Email address *"
            onChange={event => this.handleChangeEmail(event)}
            required
          />
        )}
        <Form.Field
          id="phone"
          control={Input}
          name="phone"
          type="text"
          placeholder="Phone number *"
          onChange={event => this.handleChangePhone(event)}
          required
        />
        <Form.Field
          id="password"
          control={Input}
          name="password"
          type="password"
          placeholder="Password *"
          onChange={event => this.handleChangePassword(event)}
          required
        />
        <Form.Field
          id="confirmpass"
          control={Input}
          name="confirmpass"
          type="password"
          placeholder="Confirm password *"
          onChange={event => this.handleChangeConfirmPassword(event)}
          required
        />
        <Form.Field
          control={Button}
          content="Send"
          id="submit"
          type="submit"
          compact
          onClick={this.submit}
        />
      </Form>
    );
  }
}
export default connect(
  null,
  { registerAttempt },
)(RegistrationForm);
RegistrationForm.propTypes = {
  params: PropTypes.shape({
    role: PropTypes.string,
    teamId: PropTypes.string,
    encryptEmail: PropTypes.string,
  }).isRequired,
  registerAttempt: PropTypes.func.isRequired,
};
