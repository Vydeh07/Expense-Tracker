import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function DeleteTransaction(){
  const { id } = useParams();
  const nav = useNavigate();
  const [tx, setTx] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/transactions/${id}`);
        setTx(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load transaction');
        nav('/');
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/transactions/${id}`);
      nav('/');
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (!tx) return <div>Loading...</div>;

  return (
    <div className="card">
      <h3>Delete Transaction</h3>
      <p>Are you sure you want to delete <b>{tx.title}</b> of amount {tx.amount.toFixed(2)}?</p>
      <div style={{display:'flex', gap:8}}>
        <button className="btn danger" onClick={handleDelete}>Yes, delete</button>
        <Link className="btn" to="/">Cancel</Link>
      </div>
    </div>
  );
}
