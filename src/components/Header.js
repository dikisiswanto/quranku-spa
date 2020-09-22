import React from 'react';
import { Link } from 'react-router-dom';
import app from '../data/app.json';
import Nav from './Nav';

const Header = () => (
  <header className="px-3 shadow border border-gray-300 z-10 bg-white sticky top-0">
    <div className="container flex flex-col lg:flex-row items-center justify-between">
      <h1 className="font-bold text-xl tracking-wider pt-3 pb-1 lg:pb-3">
        <Link to="/" className="flex text-teal-700 items-center">
          <img src={`${process.env.PUBLIC_URL}/quranku.svg`} alt="Logo of Quranku" className="h-6 mr-2 w-auto" />
          {app.name}
        </Link>
      </h1>
      <Nav />
    </div>
  </header>
);

export default Header;
