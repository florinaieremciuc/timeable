import React, { Component } from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./styles.css";

class Sidemenu extends Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        animation="push"
        width="thin"
        visible={this.props.visible}
        icon="labeled"
        vertical
        inverted
      >
        <Menu.Item name="browser">
          <Link to="/projects">
            <Icon name="browser" />
            Projects
          </Link>
        </Menu.Item>
        <Menu.Item name="users">
          <Link to="/teams">
            <Icon name="users" />
            Teams
          </Link>
        </Menu.Item>
        <Menu.Item name="checked calendar">
          <Link to="/events">
            <Icon name="checked calendar" />
            Clendar
          </Link>
        </Menu.Item>
      </Sidebar>
    );
  }
}

export default Sidemenu;
