"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const fruits_service_1 = require("../services/fruits-service");
router.get('/fruits', ((req, res) => {
    const results = (0, fruits_service_1.fetchAllFruits)();
    return res.status(200).send(results);
}));
router.get('/fruits/fruit', ((req, res) => {
    const { name, color, in_season } = req.query;
    if (!name && !color && !in_season) {
        return res.status(400).send('invalid query parameters');
    }
    const results = (0, fruits_service_1.fetchFruits)(name, color, in_season);
    return res.status(200).send(results);
}));
module.exports = router;
