import React from 'react';
import logo_unp from '../assets/images/unp_logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary-subtle p-2">
      <img
        src={logo_unp}
        width="30"
        height="30"
        alt="Logo"
        className="ml-2"
      />
      <a className="ms-2 navbar-brand" href="/">
        Universidad Nacional de Piura
      </a>
    </nav>
  );
};

export default Navbar;
