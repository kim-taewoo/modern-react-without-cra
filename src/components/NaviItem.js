import React from 'react';
import { NavLink } from 'react-router-dom';
import toggle from '@/hocs/toggle';

const NaviItem = ({ to, text }) => {
  return (
    <li className="nav-item">
      <NavLink to={to} className="nav-link">
        {text}
      </NavLink>
    </li>
  );
};

export default toggle(NaviItem);
