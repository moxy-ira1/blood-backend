require('dotenv').config();

const { startApp } = require('./startup/startApp');

startApp().catch((err) => {
  console.error('Fatal startup error', err);
  process.exit(1);
});

