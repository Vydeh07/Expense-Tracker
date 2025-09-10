import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <div className="bg-white shadow rounded-lg p-4">No transactions yet.</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Title', 'Category', 'Date', 'Amount', ''].map((h) => (
              <th key={h} className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td className="px-4 py-2">{tx.title}</td>
              <td className="px-4 py-2">{tx.category}</td>
              <td className="px-4 py-2">{format(new Date(tx.date), 'yyyy-MM-dd')}</td>
              <td
                className={`px-4 py-2 font-medium ${
                  tx.amount < 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {tx.amount.toFixed(2)}
              </td>
              <td className="px-4 py-2 space-x-2">
                <Link to={`/${tx._id}/edit`} className="text-indigo-600 hover:underline">Edit</Link>
                <Link to={`/${tx._id}/delete`} className="text-red-600 hover:underline">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
