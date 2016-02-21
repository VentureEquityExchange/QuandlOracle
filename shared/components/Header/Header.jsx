/* eslint no-unused-vars: 0 */
/* eslint-disable prefer-template*/
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

function Header(props, context) {
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="site-title">
          <Link to="/" onClick={props.handleLogoClick}>Quandl Oracle</Link>
        </h1>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleLogoClick: PropTypes.func,
};

export default Header;
