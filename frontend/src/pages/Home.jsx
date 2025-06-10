import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <div className="text-center text-white max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to Our Company
        </h1>
        <p className="text-xl mb-6 text-white/90">
          Empowering innovation with technology, design, and strategy. Join us to build the future.
        </p>
        <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-gray-100 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
