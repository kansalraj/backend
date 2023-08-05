const Wallet = require("../models/walletModel");
const { ObjectId } = require("mongoose").Types;

exports.setupWallet = async (req, res) => {
  try {
    const { balance, name } = req.body;
    const wallet = new Wallet({ balance, name });
    await wallet.save();

    const response = {
      id: wallet._id,
      balance: wallet.balance,
      name: wallet.name,
      date: new Date(),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error setting up wallet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get wallet details
exports.getWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findById(id);

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const timestamp = new ObjectId(id).getTimestamp();

    const response = {
      id: wallet._id,
      balance: wallet.balance,
      name: wallet.name,
      date: timestamp,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching wallet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
