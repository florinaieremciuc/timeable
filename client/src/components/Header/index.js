import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../assets/Timeable_logo_full_dim.svg';
import './styles.css';

const Header = (props) => {
  const { isAuthenticated, logout, username } = props;
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      {isAuthenticated && (
        <div className="icons">
          <Link to={`/profile/${username}`}>
            <Icon name="user circle outline" />
          </Link>
          <Link to="/">
            <Icon name="log out" onClick={logout} />
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
  username: PropTypes.string,
};
Header.defaultProps = {
  isAuthenticated: null,
  logout: null,
  username: null,
};
