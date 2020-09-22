import React from 'react';
import { NavLink } from 'react-router-dom';
import { navs } from '../data/navs.json';

const Nav = () => (
  <nav>
    <ul className="flex justify-between items-center gap-x-6">
      {navs.map((nav) => (
        <li key={nav.id}>
          <NavLink
            exact
            to={nav.path}
            activeStyle={{
              fontWeight: 600,
            }}
          >
            <div className="inline-block py-3 px-3 text-teal-900 hover:text-teal-600 transition duration-200">{nav.name}</div>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
