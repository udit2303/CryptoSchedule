const axios = require('axios');
require("dotenv").config();
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const fetchCoinData = async (coin) => {
    try {
        console.log(`Fetching data for ${coin}...`);
        console.log(`${API_URL}/coins/${coin}`)
        const response = await axios.get(`${API_URL}/coins/${coin}`, {
            headers: {
                "x-cg-demo-api-key" : API_KEY,
            },
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(`Error fetching data for ${coin}:`, error.message);
    }
};


module.exports = fetchCoinData;
