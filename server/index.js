const express = require('express');
const { PORT } = require('./config');
const app = express();
const Router = require('./router');
const morgan = require('morgan');


app.use(express.json());
app.use(morgan('tiny'));
app.use('/', Router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

module.exports.server = app;