import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Form, Input, Select, Confirm } from 'semantic-ui-react';

import { createTaskAttempt } from '../../../../State/Tasks/create/actions';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmVisible: false,
      open: false,
      name: null,
      description: null,
      estimate: null,
      priority: null,
    };
    this.openConfirm = this.openConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  openConfirm() {
    this.setState({ confirmVisible: true });
  }
  closeConfirm() {
    this.setState({ confirmVisible: false });
  }

  open() {
    this.setState({ open: true });
  }
  close() {
    this.setState({ open: false });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }
  handleChangeEstimate(event) {
    this.setState({ estimate: event.target.value });
  }
  handleChangePriority(event) {
    this.setState({ priority: event.target.value });
  }

  async submit() {
    if (this.state.name && this.state.estimate && this.state.priority) {
      await this.props.createTaskAttempt(
        this.state.name,
        this.state.description,
        this.state.estimate,
        this.state.priority,
        'to_do', // for starters, status will be to do
        this.props.project, // project
      );
    } else {
      this.openConfirm();
      return (
        <Confirm
          open={this.state.confirmVisible}
          onCancel={this.closeConfirm}
          onConfirm={this.closeConfirm}
          content="Fill in the fields ca lumea boss"
        />
      );
    }
    this.close();
    return null;
  }

  render() {
    const { open } = this.state;

    return (
      <Modal
        closeIcon
        dimmer={false}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button icon>
            Add task <Icon name="add" />
          </Button>
        }
      >
        <Modal.Header>New task</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.submit}>
            <Form.Field
              id="name"
              control={Input}
              name="name"
              type="text"
              placeholder="Name"
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
            <Form.Field
              id="estimate"
              control={Input}
              name="estimate"
              type="text"
              placeholder="Estimate"
              onChange={event => this.handleChangeEstimate(event)}
              required
            />
            <Form.Field
              id="priority"
              control={Select}
              options={[
                { key: '0', text: 'Mild', value: 'nice-to-have' },
                { key: '1', text: 'Medium', value: 'enhancement' },
                { key: '2', text: 'Medium high', value: 'new-feature' },
                { key: '3', text: 'High', value: 'bug' },
              ]}
              name="priority"
              type="text"
              placeholder="Priority"
              onChange={event => this.handleChangePriority(event)}
              required
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" onClick={this.submit} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, { createTaskAttempt })(AddTask);
AddTask.propTypes = {
  project: PropTypes.number.isRequired,
  createTaskAttempt: PropTypes.func.isRequired,
};
