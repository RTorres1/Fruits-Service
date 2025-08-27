const express = require('express');
const router = express.Router();

import { fetchFruits, fetchAllFruits } from '../services/fruits-service';


router.get('/fruits', ((req, res) => {
    const results = fetchAllFruits();
    return res.status(200).send(results);
}));

router.get('/fruits/fruit', ((req, res) => {

    const { name, color, in_season } = req.query;

    if(!name && !color && !in_season){
        return res.status(400).send('invalid query parameters');
    }

    const results = fetchFruits(name, color, in_season);
    return res.status(200).send(results);
}));


module.exports = router; 