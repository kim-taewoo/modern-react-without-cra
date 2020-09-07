import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <NavLink to="/" className="navbar-brand">
      <i className="fab fa-facebook-square" />

      <style jsx>{`
        :global(.navbar-brand i.fa-facebook-square) {
          font-size: 27px !important;
          color: white;
        }
      `}</style>
    </NavLink>
  );
};

export default Logo;
