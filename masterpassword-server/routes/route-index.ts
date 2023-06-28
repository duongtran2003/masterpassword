import { Request, Response } from "express";

let express = require('express');

let router = express.Router();

let passwordRoute = require('./psws');
router.use('/password', passwordRoute);
router.get('/', (req: Request, res: Response) => {
    res.send("hehehehe");
});


module.exports = router;