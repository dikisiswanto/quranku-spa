import React from 'react';
import App from '../App';

const About = () => (
  <App>
    <div className="bg-teal-600 py-5 px-3 text-center text-white my-5 rounded-md shadow">
      <img src="/quranku.svg" alt="Quranku logo" className="w-1/4 mx-auto" />
      <span className="pt-3 block text-lg md:text-xl lg:text-2xl tracking-widest font-semibold">Quranku</span>
    </div>
    <div className="py-3 text-center">
      <h4 className="text-semibold font-lg">Sumber data</h4>
      <span className="block text-gray-700">
        <a href="https://github.com/sutanlab/quran-api" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline px-2">Quran API</a>
        {' '}
        oleh Sutan Nasution
      </span>
    </div>
    <div className="py-3 text-center">
      <h4 className="text-semibold font-lg">Teknologi Pendukung</h4>
      <span className="block text-gray-700">
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline px-2">React</a>
        <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline px-2">TailwindCSS</a>
      </span>
    </div>
  </App>
);

export default About;
