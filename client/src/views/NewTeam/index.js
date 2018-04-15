import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import CreateTeamForm from "./components/CreateTeam";
import "./styles.css";

let CreateTeam = () => {
  return (
    <Container className="create-team">
      <h1>Create team</h1>
      <CreateTeamForm />
    </Container>
  );
};

export default CreateTeam;
