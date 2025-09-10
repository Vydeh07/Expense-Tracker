import React, { useState } from 'react';

export default function FilterForm({ onApply, initial = {} }) {
  const [category, setCategory] = useState(initial.category || '');
  const [from, setFrom] = useState(initial.from || '');
  const [to, setTo] = useState(initial.to || '');

  const apply = (e) => {
    e.preventDefault();
    onApply({ category: category || undefined, from: from || undefined, to: to || undefined });
  };

  const reset = () => {
    setCategory('');
    setFrom('');
    setTo('');
    onApply({}); 
  };

  return (
    <form
      onSubmit={apply}
      className="bg-white shadow rounded-lg p-4 flex flex-wrap gap-4 items-end"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          className="mt-1 border rounded-lg px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">From</label>
        <input
          type="date"
          className="mt-1 border rounded-lg px-3 py-2"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">To</label>
        <input
          type="date"
          className="mt-1 border rounded-lg px-3 py-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button className="bg-indigo-600 text-white px-3 py-2 rounded-lg" type="submit">
          Apply
        </button>
        <button
          type="button"
          onClick={reset}
          className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </form>
  );
}