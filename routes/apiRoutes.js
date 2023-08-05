const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const transactionController = require('../controllers/transactionController');

// Initialize wallet
router.post('/setup', walletController.setupWallet);

// Credit/Debit amount
router.post('/transact/:walletId', transactionController.creditOrDebit);

// Fetch transactions
router.get('/transactions', transactionController.getTransactions);

// Get wallet
router.get('/wallet/:id', walletController.getWallet);

module.exports = router;
