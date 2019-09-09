const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { scrapePuzzle } = require('./lib/scrape-puzzle');
require('dotenv').config();

const app = express();
const { PORT } = process.env;
const port = PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.listen(port);

console.log(`listening on port: ${port}`);

app.get('/puzzle', async (req, res) => {
  const puzzleData = await scrapePuzzle();
  res.send(puzzleData);
});
