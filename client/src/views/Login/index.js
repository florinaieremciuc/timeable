import React from 'react';
import { Container } from 'semantic-ui-react';

import LoginForm from './components/Login';
import './styles.css';

const Login = () => (
  <Container className="login">
    <h1>Login</h1>
    <LoginForm />
  </Container>
);
export default Login;
