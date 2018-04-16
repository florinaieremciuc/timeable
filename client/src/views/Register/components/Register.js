import React from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import { registerAttempt } from "../actions";
import { getId as getTeamId } from "../../NewTeam/reducer";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmpass: "",
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      phone: "",
      role: ""
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
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
  handleChangeRole(event) {
    this.setState({
      role: event.target.innerText.replace(/\s/g, "").toLowerCase()
    });
  }
  submit() {
    this.state.password === this.state.confirmpass
      ? this.props.registerAttempt(
          this.state.username,
          this.state.password,
          this.state.firstname,
          this.state.lastname,
          this.state.email,
          this.state.phone,
          this.state.role,
          this.props.team
        )
      : alert("Parolele difera");
    console.log("role", this.state.role);
  }

  render() {
    return (
      <Form onSubmit={this.submit}>
        <Form.Field
          id="username"
          control={Input}
          name="username"
          type="text"
          placeholder="Username"
          onChange={event => this.handleChangeUsername(event)}
          required
        />
        <Form.Field
          id="firstname"
          control={Input}
          name="firstname"
          type="text"
          placeholder="First name"
          onChange={event => this.handleChangeFirstName(event)}
          required
        />
        <Form.Field
          id="lastname"
          control={Input}
          name="lastname"
          type="text"
          placeholder="Last name"
          onChange={event => this.handleChangeLastName(event)}
          required
        />
        <Form.Field
          id="email"
          control={Input}
          name="email"
          type="text"
          placeholder="Email address"
          onChange={event => this.handleChangeEmail(event)}
          required
        />
        <Form.Field
          id="phone"
          control={Input}
          name="phone"
          type="text"
          placeholder="Phone number"
          onChange={event => this.handleChangePhone(event)}
          required
        />
        <Form.Field
          id="role"
          control={Select}
          name="role"
          placeholder="Role"
          // value={this.state.role}
          options={[
            { key: "teamlead", text: "Team lead", value: "Team lead" },
            { key: "frontend", text: "Front end", value: "Front end" },
            { key: "backend", text: "Back end", value: "Back end" },
            { key: "tester", text: "Tester", value: "Tester" },
            { key: "sysadmin", text: "Sys admin", value: "Sys admin" }
          ]}
          onChange={event => this.handleChangeRole(event)}
          required
        />
        <Form.Field
          id="password"
          control={Input}
          name="password"
          type="password"
          placeholder="Password"
          onChange={event => this.handleChangePassword(event)}
          required
        />
        <Form.Field
          id="confirmpass"
          control={Input}
          name="confirmpass"
          type="password"
          placeholder="Confirm password"
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

const mapStateToProps = state => ({
  team: getTeamId(state.team)
});
export default connect(mapStateToProps, { registerAttempt })(RegistrationForm);
