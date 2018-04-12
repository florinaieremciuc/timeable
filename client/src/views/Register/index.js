import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import RegistrationForm from "./Register";

let Register = () => {
  return (
    <Container>
      <h1>Register</h1>
      <RegistrationForm />
    </Container>
  );
};

export default Register;
