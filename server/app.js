const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // cors require

// db connection
const db = require("./configs/db.config");

// route routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classicScoresRouter = require('./routes/simpleScores');
const numberScoresRouter = require('./routes/numberScores');

const app = express();

app.use(cors()) // CORS middleware useage
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter(db));
app.use('/classic_scores', classicScoresRouter(db));
app.use('/number_scores', numberScoresRouter(db));

module.exports = app;
