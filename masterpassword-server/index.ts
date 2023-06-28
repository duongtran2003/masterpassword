import express from "express";
let routes = require('./routes/route-index');
let app = express();
let db = require('./db');

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(routes);
db.connect();
app.listen('8000', () => {
    console.log("started");
});