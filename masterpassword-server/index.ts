import { Request, Response } from "express";
let express = require('express');
let routes = require('./routes/route-index');
let app = express();

app.use(routes);

app.listen('8000', () => {
    console.log("started");
});