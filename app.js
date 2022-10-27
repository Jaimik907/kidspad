const express = require('express');
// const dotenv = require('dotenv');
const sequelize = require('./utils/database');
const cors = require('cors');
const userRoute = require('./src/user/router');
const authRoute = require('./src/auth/router');

// dotenv.config();
// const port = process.env.PORT;

const app = express();
let corsOption = {
  origin: 'https//localhost:3000',
};

app.use(express.json());
app.use(cors(corsOption));

app.use('/users', userRoute);
app.use('/auth',authRoute);

sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log(`[server]: Server is running at http://localhost:${3001}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

module.exports = app;
