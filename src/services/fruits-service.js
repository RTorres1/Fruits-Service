"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllFruits = exports.fetchFruits = void 0;
const fruit_constants_1 = require("../constants/fruit-constants");
const fruits_dao_1 = require("../dao/fruits-dao");
const fetchFruits = (name, color, inSeason) => {
    const queryParams = generateQueryParams(name, color, inSeason);
    return (0, fruits_dao_1.queryFruits)(queryParams);
};
exports.fetchFruits = fetchFruits;
const fetchAllFruits = () => (0, fruits_dao_1.getFruits)();
exports.fetchAllFruits = fetchAllFruits;
/**
 * @param name
 * @param color
 * @param inSeason
 * @returns query paramater list
 */
const generateQueryParams = (name, color, inSeason) => {
    const queryParams = [];
    if (!!name) {
        queryParams.push({ key: fruit_constants_1.NAME, value: name });
    }
    if (!!color) {
        queryParams.push({ key: fruit_constants_1.COLOR, value: color });
    }
    if (inSeason === fruit_constants_1.IN || inSeason === fruit_constants_1.OUT) {
        queryParams.push({ key: fruit_constants_1.IN_SEASON, value: inSeason });
    }
    return queryParams;
};
