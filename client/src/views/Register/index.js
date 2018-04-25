import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import RegistrationForm from './components/Register';
import './styles.css';

const Register = props => (
  <Container className="register">
    <h1>Register</h1>
    <Divider />
    <RegistrationForm params={props.match.params} />
  </Container>
);
export default Register;
Register.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
