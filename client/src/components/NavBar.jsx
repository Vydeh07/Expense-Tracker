import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(){
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold text-indigo-600">Finance Tracker</Link>
        <Link to="/add" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Add
        </Link>
      </div>
    </nav>
  );
}

