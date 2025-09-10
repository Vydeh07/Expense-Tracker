import React from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import api from '../api';

export default function AddTransaction(){
  const nav = useNavigate();

  const handleSubmit = async (payload) => {
    try {
      await api.post('/transactions', payload);
      nav('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Create failed');
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <TransactionForm onSubmit={handleSubmit} submitLabel="Add Transaction" />
    </div>
  );
}
