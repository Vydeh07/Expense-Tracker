import React, { useEffect, useState } from 'react';
import api from '../api';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart({ from, to }) {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const params = {};
      if (from) params.from = from;
      if (to) params.to = to;
      const res = await api.get('/transactions/summary', { params });
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to fetch summary', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [from, to]);

  if (loading) return <div>Loading chart...</div>;
  if (!summary || summary.length === 0) return <div>No data for chart.</div>;

  const labels = summary.map(s => s._id);
  const dataValues = summary.map(s => Math.abs(Number(s.total.toFixed(2))));

  const colors = [
    '#4F46E5', '#F59E0B', '#10B981',
    '#EF4444', '#3B82F6', '#EC4899',
    '#22D3EE', '#84CC16',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Amount (abs)',
        data: dataValues,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium mb-2">Spending by Category</h3>
      <Pie data={data} />
    </div>
  );
}
