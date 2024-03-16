const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const exchangeRates = {
  "USD": 1,   
  "GBP": 0.72,   
  "EUR": 0.85,   
  "JPY": 147.58,
  "UAH": 38.5     
};

app.use(bodyParser.json());

app.post('/convert', (req, res) => {
  const { amount, from, to } = req.body;

  if (!amount || !from || !to || isNaN(amount)) {
    return res.status(400).json({ error: "Неправильні дані. Перевірте параметри." });
  }

  if (!exchangeRates[from] || !exchangeRates[to]) {
    return res.status(400).json({ error: "Неправильна валюта. Доступні: USD, GBP, EUR, JPY." });
  }

  const convertedAmount = (amount * exchangeRates[to]) / exchangeRates[from]; // Змінили розрахунок тут
  res.json({ amount: convertedAmount.toFixed(2), currency: to });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
