const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv/config');
const { Article } = require('./database/models');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.get('*', async (req, res) => {
  const articles = await Article.query()
    .withGraphFetched('author')
    .omit(['id', 'author_id']);

  return res.json(articles);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
