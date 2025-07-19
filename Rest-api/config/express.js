const cors = require('cors')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'SoftUni';
// const { errorHandler } = require('../utils')

module.exports = (app) => {
    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(cookieParser(cookieSecret));

    app.use(express.json());

    app.options('*', (req, res) => {
        console.log('Received OPTIONS preflight for', req.path);
        res.sendStatus(204);
    });

    app.use(express.static(path.resolve(__basedir, 'static')));

    // app.use(errorHandler(err, req, res, next));
};
