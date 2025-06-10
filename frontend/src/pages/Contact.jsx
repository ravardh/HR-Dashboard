import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-md w-full p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-purple-700 text-center">Contact Us</h1>
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
