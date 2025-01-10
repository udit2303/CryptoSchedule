const schedule = require("node-schedule");
const fetchCoinData = require("./fetchData");
const curData = require("../models/curData");

const coins = process.env.COINS.split(",");
const TWO_HOURS = 2 * 60 * 60 * 1000;

const scheduleCoinFetch = async (coin, nextFetchTime) => {
  schedule.scheduleJob(nextFetchTime, async () => {
    console.log(`Scheduled fetch started for ${coin}...`);
    const data = await fetchCoinData(coin);
    if (data) {
      await curData.create({
      coin,
      price_usd: data["market_data"]["current_price"]["usd"],
      market_cap_usd: data["market_data"]["market_cap"]["usd"],
      "24hr_change": data["market_data"]["price_change_24h_in_currency"]["usd"],
      timestamp: now,
      });
      console.log(`Inserted new data for ${coin}`);
    }
    else{
      console.log(`No data found for ${coin}`);
    }
    console.log(`Fetch completed for ${coin}. Rescheduling...`);
    scheduleCoinFetch(coin, new Date(nextFetchTime.getTime() + TWO_HOURS));
  });

  console.log(`Next fetch for ${coin} scheduled at: ${nextFetchTime}`);
};

const scheduleFetch = async () => {
  try {
    const now = new Date();

    for (const coin of coins) {
      if(!coin || coin === ""){
        console.log("Please provide a coin name");
        continue;
      }
      const lastRecord = await curData.findOne({ coin });

      let nextFetchTime;

      if (lastRecord && lastRecord.timestamp) {
        const lastFetched = new Date(lastRecord.timestamp);
        const elapsedTime = now - lastFetched;

        if (elapsedTime >= TWO_HOURS) {
          console.log(`2 hours have passed since the last fetch for ${coin}. Fetching data now...`);
          const data = await fetchCoinData(coin);
          if (data) {
            await curData.create({
            coin,
            price_usd: data["market_data"]["current_price"]["usd"],
            market_cap_usd: data["market_data"]["market_cap"]["usd"],
            "24hr_change": data["market_data"]["price_change_24h_in_currency"]["usd"],
            timestamp: now,
            });
            console.log(`Inserted new data for ${coin}`);
          }
          else{
            console.log(`No data found for ${coin}`);
          } 
          nextFetchTime = new Date(now.getTime() + TWO_HOURS);
        } else {
          nextFetchTime = new Date(lastFetched.getTime() + TWO_HOURS);
        }
      } else {
        console.log(`No previous data found for ${coin}. Fetching data now...`);
        const data = await fetchCoinData(coin);
          if (data) {
            await curData.create({
            coin,
            price_usd: data["market_data"]["current_price"]["usd"],
            market_cap_usd: data["market_data"]["market_cap"]["usd"],
            "24hr_change": data["market_data"]["price_change_24h_in_currency"]["usd"],
            timestamp: now,
            });
            console.log(`Inserted new data for ${coin}`);
          }
          else{
            console.log(`No data found for ${coin}`);
          } 
        nextFetchTime = new Date(now.getTime() + TWO_HOURS);
      }

      scheduleCoinFetch(coin, nextFetchTime);
    }
  } catch (error) {
    console.error("Error in scheduling fetch:", error.message);
  }
};

module.exports = scheduleFetch;
