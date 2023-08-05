const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    balance: { type: Number, required: true },
    name: { type: String, required: true },
  },
  {
    versionKey: 'version', 
  }
);

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
