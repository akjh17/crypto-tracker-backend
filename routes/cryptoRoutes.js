const express = require("express");
const router = express.Router();
const cryptoController = require("../controllers/cryptoController");

router.get("/market-data", cryptoController.getMarketData);
router.post("/portfolio", cryptoController.createPortfolio);
router.get("/portfolio/:id", cryptoController.getPortfolio);

module.exports = router;
