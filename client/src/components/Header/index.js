import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { logout } from "../../views/Login/actions";

import logo from "../../assets/Timeable_logo_full_dim.svg";
import "./styles.css";

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    console.log("is auth", isAuthenticated);
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        {isAuthenticated && (
          <div className="icons">
            <Link to="/profile/${username}">
              <Icon name="user circle outline" />
            </Link>
            <Icon name="log out" onClick={this.props.logout} />
          </div>
        )}
      </header>
    );
  }
}
const mapStateToProps = state => {
  // get user is ceva metoda in reducer
};
export default connect(mapStateToProps, { logout })(Header);
