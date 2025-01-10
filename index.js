const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const apiRouter = require('./routes/api');
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const scheduleFetch = require('./utils/schedule');
scheduleFetch();

app.use('/api', apiRouter);