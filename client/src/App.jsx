import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import DeleteTransaction from './pages/DeleteTransaction';
import NavBar from './components/NavBar';

export default function App(){
  return (
    <div className="app">
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/:id/edit" element={<EditTransaction />} />
          <Route path="/:id/delete" element={<DeleteTransaction />} />
        </Routes>
      </main>
    </div>
  );
}
