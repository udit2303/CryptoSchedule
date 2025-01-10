// /stats Router
const express = require('express');
const router = express.Router();
const math = require('mathjs');
const curData = require('../models/curData');
const fetchData = require('../utils/fetchData');
router.get('/stats', async (req, res) => {
    const coin = req.query.coin;
    if(!coin || coin === ""){
        res.status(400).json({message: "Please provide a coin name"});
        return;
    }
    try {
        const data = await fetchData(coin);
        if (data) {
            res.status(200).json({
                price: data["market_data"]["current_price"]["usd"],
                marketCap: data["market_data"]["market_cap"]["usd"],
                "24hr_change": data["market_data"]["price_change_24h_in_currency"]["usd"],
            });
        } else {
            res.status(404).json({ message: `No data found for ${coin}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/deviation', async (req, res) => {
    const coin = req.query.coin;
    if(!coin || coin === ""){
        res.status(400).json({message: "Please provide a coin name"});
        return;
    }
    try {
        const records = await curData.find({ coin }).limit(100);
    
        if (records.length === 0) {
          return res.status(404).json({ error: "No data found for the specified coin" });
        }
    
        const prices = records.map((record) => record.price_usd);
    
        const mean = math.mean(prices);
        const squaredDiffs = prices.map((price) => Math.pow(price - mean, 2));
        const variance = math.mean(squaredDiffs);
        const stdDeviation = Math.sqrt(variance);
    
        res.json({ deviation: stdDeviation.toFixed(2) });
      } catch (error) {
        console.error("Error fetching or processing data:", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
});
module.exports = router;