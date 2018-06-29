import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Form, Input, Confirm } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { createEventAttempt } from '../../../../../../State/Events/create/actions';

import './styles.css';

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmVisible: false,
      open: false,
      name: null,
      topic: null,
      date: null,
      details: null,
      place: null,
      extra: null,
    };
    this.openConfirm = this.openConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeTopic = this.handleChangeTopic.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeDetails = this.handleChangeDetails.bind(this);
    this.handleChangePlace = this.handleChangePlace.bind(this);
    this.handleChangeExtra = this.handleChangeExtra.bind(this);

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
  handleChangeTopic(event) {
    this.setState({ topic: event.target.value });
  }
  handleChangeDate(date) {
    this.setState({ date });
  }
  handleChangeDetails(event) {
    this.setState({ details: event.target.value });
  }
  handleChangePlace(event) {
    this.setState({ place: event.target.value });
  }
  handleChangeExtra(event) {
    this.setState({ extra: event.target.value });
  }

  async submit() {
    if (
      this.state &&
      this.state.name &&
      this.state.topic &&
      this.state.date &&
      this.state.place &&
      this.props.team
    ) {
      await this.props.createEventAttempt(
        this.state.name,
        this.state.topic,
        this.state.date,
        this.state.details,
        this.state.place,
        this.state.extra,
        this.props.team,
      );
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
          content="Fill in the fields correctly"
        />
      );
    }

    return (
      <Modal
        style={{ marginTop: '-90vh!important' }}
        closeIcon
        dimmer={false}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button icon>
            Add event <Icon name="add" />
          </Button>
        }
      >
        <Modal.Header>New event</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.submit}>
            <Form.Field
              id="name"
              control={Input}
              name="name"
              type="text"
              placeholder="Title"
              onChange={event => this.handleChangeName(event)}
            />
            <Form.Field
              id="topic"
              control={Input}
              name="topic"
              type="text"
              placeholder="Topic"
              onChange={event => this.handleChangeTopic(event)}
            />
            <DatePicker
              required
              id="date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="time"
              onChange={this.handleChangeDate}
              minDate={moment()}
              placeholderText="Select the date"
              selected={this.state.date}
            />
            <Form.Field
              id="details"
              control={Input}
              name="details"
              type="text"
              placeholder="Details"
              onChange={event => this.handleChangeDetails(event)}
            />
            <Form.Field
              id="place"
              control={Input}
              name="place"
              type="text"
              placeholder="Place"
              onChange={event => this.handleChangePlace(event)}
            />
            <Form.Field
              id="extra"
              control={Input}
              name="extra"
              type="text"
              placeholder="Extra"
              onChange={event => this.handleChangeExtra(event)}
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
  { createEventAttempt },
)(AddEvent);
AddEvent.propTypes = {
  createEventAttempt: PropTypes.func.isRequired,
  team: PropTypes.number.isRequired,
};
