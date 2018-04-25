import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import LoginForm from './components/Login';
import './styles.css';

const Login = (props) => {
  const { teamId, role } = props.match.params;
  return (
    <Container className="login">
      <h1>Login</h1>
      <LoginForm team={teamId} role={role} />
    </Container>
  );
};
export default Login;
Login.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
