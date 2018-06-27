import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Form, Input, Select, Confirm } from 'semantic-ui-react';

import { createRiskAttempt } from '../../../../State/Risks/create/actions';

import './style.css';

class AddRisk extends React.Component {
  static selectComponent(name, placeholder, arr, method) {
    const options = [];
    arr.map((item, k) =>
      options.push(
        Object.assign({
          key: k,
          text: item.text,
          value: item.value,
        }),
      ),
    );
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
      category: null,
      probability: null,
      impact: null,
      response: null,
    };
    this.openConfirm = this.openConfirm.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeProbability = this.handleChangeProbability.bind(this);
    this.handleChangeImpact = this.handleChangeImpact.bind(this);
    this.handleChangeResponse = this.handleChangeResponse.bind(this);

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
  handleChangeCategory(event, data) {
    this.setState({ category: data.value });
  }
  handleChangeProbability(event, data) {
    this.setState({ probability: data.value });
  }
  handleChangeImpact(event, data) {
    this.setState({ impact: data.value });
  }
  handleChangeResponse(event, data) {
    this.setState({ response: data.value });
  }

  async submit() {
    if (
      this.state &&
      this.state.description &&
      this.state.category &&
      this.state.probability &&
      this.state.impact &&
      this.state.response
    ) {
      await this.props.createRiskAttempt(
        this.state.description,
        this.state.category,
        this.state.probability,
        this.state.impact,
        this.state.response,
        this.props.project,
      );
      this.close();
    } else {
      this.openConfirm();
    }
    return null;
  }

  render() {
    const { open } = this.state;
    const categoryEnum = [
      { text: 'Technical', value: 'technical' },
      { text: 'Management', value: 'management' },
      { text: 'Organizational', value: 'organizational' },
      { text: 'Commercial', value: 'comercial' },
      { text: 'External', value: 'external' },
    ];
    const probabilityEnum = [
      { text: 'Unlikely to occur', value: '1' },
      { text: 'May or may not occur', value: '2' },
      { text: 'Likely to occur', value: '3' },
    ];
    const impactEnum = [
      { text: 'Minimal', value: '1' },
      { text: 'Moderate', value: '2' },
      { text: 'Significant', value: '3' },
    ];
    const responseEnum = [
      { text: 'Watch', value: 'watch' },
      { text: 'Accept', value: 'accept' },
      { text: 'Transfer', value: 'transfer' },
      { text: 'Mitigate', value: 'mitigate' },
      { text: 'Avoid', value: 'avoid' },
    ];
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
            Add risk <Icon name="add" />
          </Button>
        }
      >
        <Modal.Header>New risk</Modal.Header>
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
            {AddRisk.selectComponent(
              'category',
              'Category',
              categoryEnum,
              this.handleChangeCategory,
            )}
            {AddRisk.selectComponent(
              'probability',
              'Propbability',
              probabilityEnum,
              this.handleChangeProbability,
            )}
            {AddRisk.selectComponent(
              'impact',
              'Impact',
              impactEnum,
              this.handleChangeImpact,
            )}
            {AddRisk.selectComponent(
              'response',
              'Response',
              responseEnum,
              this.handleChangeResponse,
            )}
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
  { createRiskAttempt },
)(AddRisk);
AddRisk.propTypes = {
  project: PropTypes.string.isRequired,
  createRiskAttempt: PropTypes.func.isRequired,
};
