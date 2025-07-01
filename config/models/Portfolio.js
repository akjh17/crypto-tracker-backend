const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  netWorth: {
    type: Number,
    default: 0,
  },
  holdings: [
    {
      token: String,
      amount: Number,
      valueUSD: Number,
    },
  ],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
