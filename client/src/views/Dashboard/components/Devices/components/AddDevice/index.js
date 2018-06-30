import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Form, Input, Confirm, Select } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';

import { userPropType } from '../../../../../../State/Users/login/reducers';
import { createDeviceAttempt } from '../../../../../../State/Devices/create/actions';

import './styles.css';

class AddDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmVisible: false,
      open: false,
      name: null,
      specs: null,
      startDate: moment(),
      endDate: null,
      price: null,
    };
    this.openConfirm = this.openConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSpecs = this.handleChangeSpecs.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);

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
  handleChangeSpecs(event) {
    this.setState({ specs: event.target.value });
  }
  handleChangeStartDate(date) {
    this.setState({ startDate: date });
  }
  handleChangeEndDate(date) {
    this.setState({ endDate: date });
  }
  handleChangePrice(event) {
    this.setState({ price: event.target.value });
  }
  handleChangeUser(event, data) {
    this.setState({ user: data.value });
  }

  async submit() {
    if (
      this.state &&
      this.state.name &&
      this.state.specs &&
      this.state.startDate &&
      this.state.endDate &&
      this.state.price &&
      this.state.user &&
      this.props.project
    ) {
      await this.props.createDeviceAttempt(
        this.state.name,
        this.state.specs,
        this.state.startDate,
        this.state.endDate,
        this.props.project,
        this.state.user,
        this.state.price,
      );
      this.close();
    } else {
      this.openConfirm();
    }
    return null;
  }

  render() {
    const { members } = this.props;
    const options = [];
    members.map((member, i) => {
      const option = {};
      option.key = i;
      option.text = member.first_name + ' ' + member.last_name + ' (' + member.role + ')';
      option.value = member.id;
      options.push(option);
      return null;
    });

    const { open } = this.state;
    if (this.state.confirmVisible) {
      return (
        <Confirm
          open={this.state.confirmVisible}
          cancelButton={null}
          onConfirm={this.closeConfirm}
          content="Fill in the fields correctly"
        />
      );
    }

    return (
      <Modal
        className="add-device-form"
        closeIcon
        dimmer={false}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button icon>
            Add device <Icon name="add" />
          </Button>
        }
      >
        <Modal.Header>New device</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.submit}>
            <Form.Field
              required
              id="name"
              control={Input}
              name="name"
              type="text"
              placeholder="Name"
              onChange={event => this.handleChangeName(event)}
            />
            <Form.Field
              required
              id="specs"
              control={Input}
              name="specs"
              type="text"
              placeholder="Technical specs"
              onChange={event => this.handleChangeSpecs(event)}
            />
            <Form.Field
              required
              id="price"
              control={Input}
              name="price"
              type="text"
              placeholder="Price"
              onChange={event => this.handleChangePrice(event)}
            />
            <DatePicker
              required
              id="startDate"
              selected={this.state.startDate}
              onChange={this.handleChangeStartDate}
              minDate={moment()}
              placeholderText="Select the start date"
            />
            <DatePicker
              required
              id="endDate"
              selected={this.state.endDate}
              onChange={this.handleChangeEndDate}
              minDate={_.isNil(this.state.startDate) ? moment() : this.state.startDate}
              placeholderText="Select the end date"
            />
            <Form.Field
              required
              id="user"
              control={Select}
              options={options}
              name="user"
              type="text"
              placeholder="Member"
              onChange={(event, data) => this.handleChangeUser(event, data)}
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
  { createDeviceAttempt },
)(AddDevice);
AddDevice.propTypes = {
  createDeviceAttempt: PropTypes.func.isRequired,
  project: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(userPropType).isRequired,
};
