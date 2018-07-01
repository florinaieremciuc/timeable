import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Form, Input, Select, Confirm } from 'semantic-ui-react';

import { createTargetAttempt } from '../../../../State/Targets/create/actions';

import './style.css';

class AddTarget extends React.Component {
  static selectComponent(name, placeholder, arr, method) {
    const options = [];
    arr.map((item, k) =>
      options.push(Object.assign({
        key: k,
        text: item.text,
        value: item.value,
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
      description: null,
    };
    this.openConfirm = this.openConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.handleChangeDescription = this.handleChangeDescription.bind(this);
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

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  async submit() {
    if (this.state && this.state.description) {
      await this.props.createTargetAttempt(this.state.description, false, this.props.project);
      this.close();
    } else {
      this.openConfirm();
    }
    return null;
  }

  render() {
    const { open } = this.state;
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
            Add target <Icon name="add" />
          </Button>
        }
      >
        <Modal.Header>New target</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.submit}>
            <Form.Field
              id="description"
              control={Input}
              name="description"
              type="text"
              placeholder="Description"
              onChange={event => this.handleChangeDescription(event)}
            />
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
  { createTargetAttempt },
)(AddTarget);
AddTarget.propTypes = {
  project: PropTypes.string.isRequired,
  createTargetAttempt: PropTypes.func.isRequired,
};
