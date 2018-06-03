import React from 'react';
import { Container, Divider } from 'semantic-ui-react';

import Header from '../../components/Header';
import LoginForm from './components/Login';
import './styles.css';

const Login = () => (
  <div>
    <Header />
    <Container className="login">
      <h1>Login</h1>
      <Divider />
      <LoginForm />
    </Container>
  </div>
);
export default Login;
