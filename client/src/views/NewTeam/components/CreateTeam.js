import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { createTeamAttempt } from '../../../State/Teams/create/actions';
import { getTeam, newTeamPropType } from '../../../State/Teams/create/reducer';

class CreateTeamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      redirect: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newteam.id) {
      this.setState({ redirect: !this.state.redirect });
    }
  }

  handleChangeName(text) {
    this.setState({ name: text.target.value });
  }

  async submit() {
    if (!_.isNil(this.state.name)) {
      await this.props.createTeamAttempt(this.state.name);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/new_user/${this.props.newteam.id}`} />;
    }
    return (
      <Form onSubmit={this.submit}>
        <Form.Group widths="equal">
          <Form.Field
            id="name"
            control={Input}
            name="name"
            type="text"
            placeholder="Name *"
            onChange={event => this.handleChangeName(event)}
            required
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
  newteam: getTeam(state.team),
});
export default connect(mapStateToProps, { createTeamAttempt })(CreateTeamForm);

CreateTeamForm.propTypes = {
  newteam: newTeamPropType,
  createTeamAttempt: PropTypes.func.isRequired,
};
CreateTeamForm.defaultProps = {
  newteam: null,
};
