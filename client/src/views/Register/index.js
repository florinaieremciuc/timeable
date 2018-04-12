import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";

import RegistrationForm from "./components/Register";
import "./styles.css";

let Register = () => {
  return (
    <Container className="register">
      <h1>Register</h1>
      <Divider />
      <RegistrationForm />
    </Container>
  );
};

export default Register;
