import React from 'react';
import { Container } from 'semantic-ui-react';

import Header from '../../components/Header';
import LoginForm from './components/Login';
import './styles.css';

const Login = () => (
  <div>
    <Header />
    <Container className="login">
      <h1>Login</h1>
      <LoginForm />
    </Container>
  </div>
);
export default Login;
