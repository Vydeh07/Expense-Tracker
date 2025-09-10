const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res, next) => {
  try {
    const { category, from, to } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (from || to) filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });
    res.json(tx);
  } catch (err) {
    next(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    const { title, amount, date, category } = req.body;
    if (!title || amount === undefined || !date || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const tx = await Transaction.create({
      title,
      amount: Number(amount),
      date: new Date(date),
      category
    });
    res.status(201).json(tx);
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const { title, amount, date, category } = req.body;
    const update = { };
    if (title !== undefined) update.title = title;
    if (amount !== undefined) update.amount = Number(amount);
    if (date !== undefined) update.date = new Date(date);
    if (category !== undefined) update.category = category;

    const tx = await Transaction.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });
    res.json(tx);
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const tx = await Transaction.findByIdAndDelete(req.params.id);
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    next(err);
  }
};


exports.getSummary = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const match = {};
    if (from) match.date = { ...(match.date || {}), $gte: new Date(from) };
    if (to) match.date = { ...(match.date || {}), $lte: new Date(to) };

    const pipeline = [
      { $match: match },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      { $sort: { total: -1 } }
    ];

    const summary = await Transaction.aggregate(pipeline);
    res.json(summary);
  } catch (err) {
    next(err);
  }
};
