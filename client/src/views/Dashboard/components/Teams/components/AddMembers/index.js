import React from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';

import { addMembers } from '../../../../../../services/Teams';
import { userPropType } from '../../../../../../State/Users/login/reducers';

class AddMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 5,
      inputCount: 1,
      members: [],
      redirect: false,
    };

    this.addInput = this.addInput.bind(this);
    this.addMoreInputs = this.addMoreInputs.bind(this);
    this.removeInputs = this.removeInputs.bind(this);

    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.submit = this.submit.bind(this);
  }

  addMoreInputs() {
    if (this.state.inputCount < this.state.max) {
      this.setState({ inputCount: this.state.inputCount + 1 });
    }
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
            { key: 'frontend', text: 'Front end', value: 'Front end' },
            { key: 'backend', text: 'Back end', value: 'Back end' },
            { key: 'tester', text: 'Tester', value: 'Tester' },
            { key: 'sysadmin', text: 'Sys admin', value: 'Sys admin' },
          ]}
          onChange={event => this.handleChangeRole(event, i)}
          required
        />
      </div>
    );
  }

  inputs() {
    const rows = [];
    const { inputCount } = this.state;
    for (let i = 0; i < inputCount; i += 1) {
      rows.push(this.addInput(i));
    }
    return rows;
  }

  handleAddMember(text, index) {
    const members = Object.assign(this.state.members);
    const email = text.target.value.replace(/\s/g, '');
    if (email.includes('@') && email.includes('.')) {
      members.push({ index, email });
    }
    this.setState({ members });
  }

  handleChangeRole(event, index) {
    const members = Object.assign(this.state.members);
    members.map((member) => {
      if (member.index === index) {
        member.role = event.target.innerText.replace(/\s/g, '').toLowerCase();
      }
      return null;
    });
    this.setState({ members });
  }

  async submit() {
    const { user } = this.props;
    const { members } = this.state;
    const teamLeadFullName = user.firstname + ' ' + user.lastname;
    if (members.length > 0 && !_.isNil(user)) {
      this.setState({ redirect: !this.state.redirect });
      await addMembers(user.team, teamLeadFullName, this.state.members);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    console.log('props add members', this.props);
    return (
      <Form onSubmit={this.submit}>
        <Form.Group widths="equal">
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
          <Form.Field
            control={Button}
            content="Send"
            id="submit"
            type="submit"
            compact
            onClick={this.submit}
          />
          {this.inputs()}
        </Form.Group>
      </Form>
    );
  }
}

export default AddMembers;

AddMembers.propTypes = {
  user: userPropType.isRequired,
};
