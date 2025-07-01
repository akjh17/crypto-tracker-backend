const axios = require("axios");
const Portfolio = require("../models/Portfolio");

// GET /api/crypto/market-data
exports.getMarketData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching market data" });
  }
};

// POST /api/crypto/portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const { name, holdings } = req.body;
    let netWorth = 0;
    holdings.forEach((h) => {
      netWorth += h.valueUSD;
    });

    const portfolio = new Portfolio({
      name,
      netWorth,
      holdings,
    });

    await portfolio.save();

    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating portfolio" });
  }
};

// GET /api/crypto/portfolio/:id
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching portfolio" });
  }
};
