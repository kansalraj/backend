const Transaction = require('../models/transactionModel');
const Wallet = require('../models/walletModel');

exports.creditOrDebit = async (req, res) => {
  try {
    const { walletId } = req.params;
    const { amount, description } = req.body;

    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const newBalance = wallet.balance + amount;

    const transaction = new Transaction({
      walletId: wallet._id,
      amount,
      balance: newBalance,
      description,
      type: amount >= 0 ? 'CREDIT' : 'DEBIT',
    });

    for (let i = 0; i < 5; i++) {
      try {
        const updatedWallet = await Wallet.findOneAndUpdate(
          { _id: walletId, version: wallet.version }, 
          { balance: newBalance },
          { new: true }
        );

        if (!updatedWallet) {
          throw new Error('Version mismatch');
        }

        await transaction.save();

        const response = {
          balance: updatedWallet.balance,
          transactionId: transaction._id,
        };

        return res.status(200).json(response);
      } catch (error) {
        console.error(`Race condition retry: ${i + 1}`);
        console.error(error);
      }
    }

    throw new Error('Failed to process transaction due to race condition');
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Fetch transactions
exports.getTransactions = async (req, res) => {
  try {
    const { walletId, skip = 0, limit = 10 } = req.query;

    const transactions = await Transaction.find({ walletId })
      .sort({ date: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
