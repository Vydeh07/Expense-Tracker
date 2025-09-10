const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionsController');

router.route('/')
  .get(controller.getTransactions)
  .post(controller.createTransaction);

router.get('/summary', controller.getSummary);

router.route('/:id')
  .get(controller.getTransaction)
  .put(controller.updateTransaction)
  .delete(controller.deleteTransaction);

module.exports = router;
