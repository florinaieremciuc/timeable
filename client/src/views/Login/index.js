import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import LoginForm from "./Login";

let Login = () => {
  return (
    <Container>
      <h1>Login</h1>
      <LoginForm />
    </Container>
  );
};

export default Login;
