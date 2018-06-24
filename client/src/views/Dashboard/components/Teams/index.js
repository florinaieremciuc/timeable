import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Form,
  Input,
  Button,
  Select,
  Card,
  Segment,
  List,
  Dropdown,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getAssignedTasksAttempt } from '../../../../State/Tasks/get/actions';
import {
  getItems as getTasks,
  isAttempting as loadingTasks,
} from '../../../../State/Tasks/get/reducer';
import { taskPropType } from '../../../../State/Tasks/create/reducer';

import { updateStatusAttempt } from '../../../../State/Tasks/update/actions';

import { addMembers } from '../../../../services/Teams';
import { getMembersAttempt } from '../../../../State/Users/team/actions';
import { getItems as getMembers } from '../../../../State/Users/team/reducer';

import { getUserData as getUser, userPropType } from '../../../../State/Users/login/reducers';

import './style.css';

class Teams extends React.Component {
  static selectIcon(task) {
    switch (task.priority) {
    case '0':
      return 'idea';
    case '1':
      return 'thermometer half';
    case '2':
      return 'thermometer three quarters';
    case '3':
      return 'bug';
    default:
      return null;
    }
  }

  static selectStatus(status) {
    switch (status) {
    case 'to_do':
      return 'TO DO';
    case 'doing':
      return 'DOING';
    case 'testing':
      return 'TESTING';
    case 'DONE':
      return 'DONE';
    default:
      return null;
    }
  }

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
    this.getUserTasks = this.getUserTasks.bind(this);

    this.handleAddMember = this.handleAddMember.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    this.props.getAssignedTasksAttempt(this.props.user.team);
    this.props.getMembersAttempt(this.props.user.team);
  }

  getUserTasks(id) {
    return this.props.tasks.filter(task => task.assignee === id);
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
  handleChangeStatus(event, data, taskId) {
    if (data.value) this.props.updateStatusAttempt(taskId, data.value);
  }
  updateStatus(taskId, status, assignee, user) {
    if (assignee === user) {
      return (
        <Dropdown
          name="update-status"
          value={status}
          options={[
            { key: 0, text: 'DOING', value: 'doing' },
            { key: 1, text: 'TESTING', value: 'testing' },
            { key: 2, text: 'DONE', value: 'done' },
          ]}
          onChange={(event, data) => this.handleChangeStatus(event, data, taskId)}
          required
        />
      );
    }
    return <div>{Teams.selectStatus(status)}</div>;
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
    const { user, teamMembers } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Container className="teams">
        <h1>Team</h1>
        <div className="members">
          {teamMembers.map(member => (
            <Card key={member.id}>
              <Card.Header
                content={
                  user.firstname === member.first_name &&
                  user.lastname === member.last_name &&
                  user.role === member.role
                    ? 'My tasks'
                    : member.first_name + ' ' + member.last_name + ' (' + member.role + ')'
                }
              />
              <Card.Content>
                <Segment inverted>
                  {this.getUserTasks(member.id).length > 0 ? (
                    <List divided inverted relaxed>
                      <strong> Tasks: </strong>
                      {this.getUserTasks(member.id).map(task => (
                        <List.Item key={task.id}>
                          <List.Icon name={Teams.selectIcon(task)} />
                          <List.Content>
                            <List.Header>{task.name}</List.Header>
                            <div>{task.description}</div>
                            <div>{this.updateStatus(task.id, task.status, task.assignee, user.id)}</div>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    'No tasks here man'
                  )}
                </Segment>
              </Card.Content>
            </Card>
          ))}
        </div>

        {user.role === 'teamlead' && (
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
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tasks: getTasks(state.tasks),
  loadTasks: loadingTasks(state.tasks),
  teamMembers: getMembers(state.members),
  user: getUser(state.user),
});
export default connect(mapStateToProps, {
  getMembersAttempt,
  getAssignedTasksAttempt,
  updateStatusAttempt,
})(Teams);

Teams.propTypes = {
  tasks: PropTypes.arrayOf(taskPropType).isRequired,
  user: userPropType.isRequired,
  getMembersAttempt: PropTypes.func.isRequired,
  getAssignedTasksAttempt: PropTypes.func.isRequired,
  updateStatusAttempt: PropTypes.func.isRequired,
  teamMembers: PropTypes.arrayOf(userPropType).isRequired,
};
