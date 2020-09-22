import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const App = ({ children }) => (
  <section className="min-h-screen flex flex-col bg-gray-200">
    <Header />
    <main className="container flex-1 h-full">
      {children}
    </main>
    <Footer />
  </section>
);

export default App;
