"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 5000;
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/repos', require('./server/routes/api/repos'));
// @route    GET *
// @desc     Любой несуществующий маршрут
// @access   Public
app.get('*', function (req, res) { return res.status(404).json({ error: ' 404: Страница не найдена' }); });
app.listen(PORT, function () { return console.log("Example app listening on port " + PORT + "!"); });
