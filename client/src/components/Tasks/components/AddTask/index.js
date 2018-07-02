import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Form, Input, Select, Confirm } from 'semantic-ui-react';

import { createTaskAttempt } from '../../../../State/Tasks/create/actions';

import './style.css';
import { targetPropType } from '../../../../State/Targets/create/reducer';
import { riskPropType } from '../../../../State/Risks/create/reducer';

class AddTask extends React.Component {
  static selectComponent(name, placeholder, arr, method) {
    const options = [];
    arr.map((item, k) =>
      options.push(Object.assign({
        key: k,
        text: item.description,
        value: item.id,
      })));
    return (
      <Form.Field
        control={Select}
        options={options}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={(event, data) => method(event, data)}
        required
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      confirmVisible: false,
      open: false,
      name: null,
      description: null,
      estimate: null,
      priority: null,
      target: null,
      risk: null,
    };
    this.openConfirm = this.openConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeEstimate = this.handleChangeEstimate.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleChangeTarget = this.handleChangeTarget.bind(this);
    this.handleChangeRisk = this.handleChangeRisk.bind(this);

    this.submit = this.submit.bind(this);
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
  handleChangePriority(event, data) {
    this.setState({ priority: data.value });
  }
  handleChangeTarget(event, data) {
    this.setState({ target: data.value });
  }
  handleChangeRisk(event, data) {
    this.setState({ risk: data.value });
  }

  async submit() {
    if (this.state && this.state.name && this.state.estimate && this.state.priority) {
      await this.props.createTaskAttempt(
        this.state.name,
        this.state.description,
        this.state.estimate,
        this.state.priority,
        'to_do', // for starters, status will be to_do
        this.props.project, // project
        this.state.target,
        this.state.risk,

      );
      this.close();
    } else {
      this.openConfirm();
    }
    return null;
  }

  render() {
    const { open } = this.state;
    const { targets, risks } = this.props;

    if (this.state.confirmVisible) {
      return (
        <Confirm
          open={this.state.confirmVisible}
          cancelButton={null}
          onConfirm={this.closeConfirm}
          content="Fill in the fields ca lumea boss"
        />
      );
    }

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
                { key: '0', text: 'Mild', value: '0' },
                { key: '1', text: 'Medium', value: '1' },
                { key: '2', text: 'Medium high', value: '2' },
                { key: '3', text: 'High', value: '3' },
              ]}
              name="priority"
              type="text"
              placeholder="Priority"
              onChange={(event, data) => this.handleChangePriority(event, data)}
              required
            />
            {AddTask.selectComponent('target', 'Target', targets, this.handleChangeTarget)}
            {AddTask.selectComponent('risk', 'Risk', risks, this.handleChangeRisk)}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="All Done" type="submit" onClick={this.submit} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(
  null,
  { createTaskAttempt },
)(AddTask);
AddTask.propTypes = {
  project: PropTypes.string.isRequired,
  createTaskAttempt: PropTypes.func.isRequired,
  targets: PropTypes.arrayOf(targetPropType).isRequired,
  risks: PropTypes.arrayOf(riskPropType).isRequired,
};
