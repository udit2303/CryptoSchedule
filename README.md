# Crypto Data Fetching and Scheduling Service

This is a Node.js service that fetches cryptocurrency data (Bitcoin, Matic, and Ethereum) every 2 hours from CoinGecko and stores the data in a MongoDB database. The service is designed to fetch the latest data, including the price in USD, market cap in USD, and 24-hour change for each coin, and it handles asynchronous scheduling of the data fetch operation.

## Features

- Fetches cryptocurrency data for Bitcoin, Matic, and Ethereum from CoinGecko.

- Stores historical data for each cryptocurrency in MongoDB.

- Schedules the next data fetch 2 hours after the last fetch.

- Ensures data is not overwritten, and all records are stored historically.

- API to fetch the standard deviation of the price for a specific cryptocurrency.

## Details
This service is designed to efficiently fetch, store, and retrieve cryptocurrency data using modern technologies and techniques:

- **Asynchronous Scheduling:**
 The service uses node-schedule for managing fetch schedules. Each coin's fetch operation is handled asynchronously, ensuring seamless execution even with differing timestamps or delays.

- **MongoDB for Storage:**
Cryptocurrency data is stored in MongoDB for historical tracking. Each record includes the coin name, price in USD, market cap, 24-hour change, and a timestamp. MongoDB provides scalability and flexibility for managing large datasets.

- **CoinGecko API Integration:**
Data is fetched from the CoinGecko API, which provides reliable and updated cryptocurrency market information. Requests are tailored for each coin to retrieve specific data points such as price, market cap, and 24-hour change.

- **Indexing for Faster Queries:**
MongoDB collections are indexed on the coin & timestamp field. This allows for efficient queries, such as retrieving the most recent data or calculating the standard deviation for the /deviation API endpoint.

- **Dynamic Environment Configuration:**
Environment variables like the MongoDB URI, CoinGecko API URL, and the list of coins make the service highly configurable and adaptable.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)

- MongoDB (Atlas or local MongoDB instance)

- npm or yarn (for managing dependencies)

## Installation

Clone the repository:
```
git clone https://github.com/udit2303/CryptoSchedule
cd CryptoSchedule
```
Install dependencies:
```
npm install
```
Set up environment variables in a `.env` file:
```
MONGO_URI=MONGO URL
COINS=bitcoin,matic-network,ethereum // Add coins here
API_URL=https://api.coingecko.com/api/v3
API_KEY = Your API key
```

- Set the `COINS` variable to the list of cryptocurrency coins you want to track (e.g., bitcoin,matic-network,ethereum).

- `API_URL` is the CoinGecko API URL for fetching coin data.
- `MONGO_URL` is the URL for MongoDB Cluster.



## Usage

Start the Service

To start the service and schedule data fetches:
```
node .
```
The service will start fetching data for each cryptocurrency, storing it in MongoDB, and rescheduling the next fetch every 2 hours based on the last fetched timestamp.

API
`
/api/deviation
`
- **Method:** `GET`

- **Description**  : Returns the standard deviation of the price of the requested cryptocurrency for the last 100 records stored in the database.

- **Parameters**:

- - `coin` (required): The name of the cryptocurrency (e.g., bitcoin, matic-network, ethereum).

Example Request:
```
GET /api/deviation?coin=bitcoin
```
Response:
```
{
  "deviation": 4082.48
}
```
## Logs

- The service logs the following:

- When a data fetch is scheduled.

- When data is fetched successfully.

- When the next fetch is scheduled.

## MongoDB Database

The data for each coin is stored in the crypto database in the following format:
```
{
  "coin": "bitcoin",
  "price_usd": 45000,
  "market_cap_usd": 850000000000,
  "24hr_change": 2.5,
  "timestamp": "2025-01-10T14:30:00.000Z"
}
```
The records are indexed by the coin field to optimize query performance.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/udit2303/CryptoSchedule/blob/main/LICENSE) file for details.