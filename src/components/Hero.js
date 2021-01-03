import React from 'react';

const Hero = ({ children }) => (
  <section className="py-4 px-3 rounded-lg bg-teal-700 mt-3 mb-5 shadow-md min-h-full">
    {children}
  </section>
);

export default Hero;
