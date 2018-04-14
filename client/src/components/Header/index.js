import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import logo from "../../assets/Timeable_logo_full_dim.svg";
import "./styles.css";

const Header = props => {
  const { isAuthenticated, logout, username } = props;
  const logoutAndRedirect = () => {
    logout();
    <Redirect to="/login" />;
  };
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      {isAuthenticated && (
        <div className="icons">
          <Link to={`/profile/${username}`}>
            <Icon name="user circle outline" />
          </Link>
          <Link to="/login">
            <Icon name="log out" onClick={logout} />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
