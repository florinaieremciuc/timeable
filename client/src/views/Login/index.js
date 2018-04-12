import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import LoginForm from "./components/Login";
import "./styles.css";

let Login = () => {
  return (
    <Container className="login">
      <h1>Login</h1>
      <LoginForm />
    </Container>
  );
};

export default Login;
