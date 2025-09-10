import React, { useEffect, useState } from 'react';
import api from '../api';
import TransactionList from '../components/TransactionList';
import FilterForm from '../components/FilterForm';
import CategoryChart from '../components/CategoryChart';

export default function Home(){
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchTx = async (f = {}) => {
    try {
      setLoading(true);
      
      const params = {};
      if (f.category) params.category = f.category;
      if (f.from) params.from = f.from;
      if (f.to) params.to = f.to;

      const res = await api.get('/transactions', { params });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTx(filters);
  }, [filters]);

  const onApplyFilters = (f) => {
    setFilters(f);
  };

  return (
  <div className="max-w-5xl mx-auto px-4 py-6">
    <h2 className="text-2xl font-semibold mb-4">All Transactions</h2>

    <FilterForm onApply={onApplyFilters} initial={filters} />

    <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 mt-6">
      <div>
        {loading ? <div>Loading...</div> : <TransactionList transactions={transactions} />}
      </div>
      <div>
        <CategoryChart from={filters.from} to={filters.to} />
      </div>
    </div>
  </div>
);
}