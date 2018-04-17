import React from "react";
import { Container, Sidebar, Button, Icon } from "semantic-ui-react";

import Projects from "./components/Projects";
import Teams from "./components/Teams";
import Events from "./components/Events";
import Menu from "../../components/Menu";

import "./styles.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.setView = this.setView.bind(this);
  }
  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }
  setView() {
    switch (this.props.path) {
      case "/projects":
        return <Projects />;
      case "/teams":
        return <Teams />;
      case "/events":
        return <Events />;
      case "/":
        return null;
      default:
        return <h1>Not found</h1>;
    }
  }
  render() {
    const { visible } = this.state;

    return (
      <div>
        <Button className="side-menu" onClick={this.toggleVisibility} />
        <Sidebar.Pushable as="div">
          <Menu visible={visible} />
          <Sidebar.Pusher className="side-menu">
            {this.setView()}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default Dashboard;
