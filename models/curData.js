const mongoose = require("../config/db");

const curDataSchema = new mongoose.Schema({
  coin: String,
  price_usd: Number,
  market_cap_usd: Number,
  "24hr_change": Number,
  timestamp: { type: Date, default: Date.now },
});
curDataSchema.index({ coin: 1, timestamp: -1 });
const dataSchema = mongoose.model("curData", curDataSchema);
module.exports = dataSchema;
