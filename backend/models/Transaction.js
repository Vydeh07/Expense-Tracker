const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => typeof v === 'number' && isFinite(v),
      message: 'Amount must be a finite number'
    }
  },
  date: { type: Date, required: true },
  category: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
