import React, { useState } from 'react';

export default function TransactionForm({ initial = {}, onSubmit, submitLabel = 'Save' }) {
  const [title, setTitle] = useState(initial.title || '');
  const [amount, setAmount] = useState(initial.amount !== undefined ? initial.amount : '');
  const [date, setDate] = useState(initial.date ? new Date(initial.date).toISOString().substr(0,10) : '');
  const [category, setCategory] = useState(initial.category || '');
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!title || amount === '' || !date || !category) {
      setError('Please fill all fields');
      return;
    }
    const payload = {
      title,
      amount: Number(amount),
      date: new Date(date).toISOString(),
      category
    };
    onSubmit(payload);
  };

 return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          step="0.01"
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}