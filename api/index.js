const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/', async (req, res) => {
    try {
        const response = await axios.get('https://www.gate.io/apiw/v2/pre_market/currencies/INIT');

        const initData = response.data.data;
        const latestDealPrice = parseFloat(initData.latest_deal_price);

        res.json({
            result: {
                lastPrice: latestDealPrice
            }
        });
    } catch (error) {
        console.error('Error fetching data from Gate.io:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
