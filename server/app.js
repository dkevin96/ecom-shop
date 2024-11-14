const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const morgan = require('morgan');
const config = require('./config');
const routes = require('./routes');
const passport = require('passport');
const helmet = require('helmet');
require('./config/passport');
const cookieSession = require('cookie-session');

const app = require('express')();
// const server = require("http").createServer(app);

app.use(
  cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:3000', 'http://host.docker.internal:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// helmet causing app to set content policy, which will block app to load script,.. from other sites, ex: stripe
// app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use('/api', routes);

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));
