import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Select } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import { createTeamAttempt } from "../actions";
import { getId } from "../reducer";

class CreateTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 8,
      inputCount: 1,
      team: "",
      members: [],
      redirect: false
    };

    this.addInput = this.addInput.bind(this);
    this.addMoreInputs = this.addMoreInputs.bind(this);
    this.removeInputs = this.removeInputs.bind(this);

    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.newteamid && this.setState({ redirect: !this.state.redirect });
  }

  addMoreInputs() {
    this.state.inputCount < this.state.max &&
      this.setState({ inputCount: this.state.inputCount + 1 });
  }

  removeInputs() {
    this.setState({ inputCount: this.state.inputCount - 1 });
    this.state.members.pop();
  }

  addInput(i) {
    return (
      <div key={i}>
        <Form.Field
          control={Input}
          name="email"
          type="email"
          placeholder="Type in member's email address"
          onBlur={event => this.handleAddMember(event, i)}
          required
        />
        <Form.Field
          control={Select}
          name="role"
          placeholder="Add member's role"
          options={[
            // { key: "teamlead", text: "Team lead", value: "Team lead" },
            { key: "frontend", text: "Front end", value: "Front end" },
            { key: "backend", text: "Back end", value: "Back end" },
            { key: "tester", text: "Tester", value: "Tester" },
            { key: "sysadmin", text: "Sys admin", value: "Sys admin" }
          ]}
          onChange={event => this.handleChangeRole(event, i)}
          required
        />
      </div>
    );
  }

  inputs() {
    var rows = [];
    var inputCount = this.state.inputCount;
    for (var i = 0; i < inputCount; i++) {
      rows.push(this.addInput(i));
    }
    return rows;
  }

  handleChangeName(text) {
    this.setState({ name: text.target.value });
  }
  handleAddMember(text, index) {
    const members = Object.assign(this.state.members);
    const email = text.target.value.replace(/\s/g, "");
    email.includes("@") && email.includes(".")
      ? members.push({ index, email })
      : null;
    this.setState({ members: members });
  }
  handleChangeRole(event, index) {
    const members = Object.assign(this.state.members);
    members.map(member => {
      if (member.index === index)
        member.role = event.target.innerText.replace(/\s/g, "").toLowerCase();
    });
    this.setState({ members });
  }

  async submit() {
    await this.props.createTeamAttempt(this.state.name, this.state.members);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/new_user" />;
    }
    console.log(this.state);
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
          {this.inputs()}
          <Form.Field
            control={Button}
            content="Add member"
            onClick={this.addMoreInputs}
            disabled={this.state.inputCount >= this.state.max}
          />
          <Form.Field
            control={Button}
            content="Remove member"
            onClick={this.removeInputs}
            disabled={this.state.inputCount <= this.state.min}
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
  newteamid: getId(state.team)
});
export default connect(mapStateToProps, { createTeamAttempt })(CreateTeamForm);
