import React from 'react';

const Card = ({ children }) => (
  <div className="shadow-sm hover:shadow-md transition duration-300 border border-gray-300 rounded-md py-5 px-4 mt-4 bg-white flex items-start justify-between overflow-hidden">
    {children}
  </div>
);

export default Card;
