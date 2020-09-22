import React from 'react';
import App from '../App';

const NotFound = () => (
  <App>
    <div className="grid grid-span-1 place-items-center w-full h-full my-5">
      <h2 className="text-5xl font-semibold">404</h2>
      <span>Sorry the page you requested is not found</span>
    </div>
  </App>
);

export default NotFound;
