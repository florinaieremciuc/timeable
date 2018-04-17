import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import LoginForm from "./components/Login";
import "./styles.css";

let Login = props => {
  const { teamId } = props.match.params;
  return (
    <Container className="login">
      <h1>Login</h1>
      <LoginForm team={teamId} />
    </Container>
  );
};

export default Login;
