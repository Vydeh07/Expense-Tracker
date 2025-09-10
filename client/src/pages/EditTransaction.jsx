import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import api from '../api';

export default function EditTransaction(){
  const { id } = useParams();
  const nav = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/transactions/${id}`);
        setInitial(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load transaction');
      }
    })();
  }, [id]);

  const handleSubmit = async (payload) => {
    try {
      await api.put(`/transactions/${id}`, payload);
      nav('/');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (!initial) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Transaction</h2>
      <TransactionForm initial={initial} onSubmit={handleSubmit} submitLabel="Update" />
    </div>
  );
}
