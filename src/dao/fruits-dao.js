"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFruits = exports.queryFruits = void 0;
const fruit_constants_1 = require("../constants/fruit-constants");
const dbFruits = [
    {
        "name": "Apple",
        "colors": ["red", "green", "yellow"],
        "in_season": true
    },
    {
        "name": "Orange",
        "colors": ["orange"],
        "in_season": true
    },
    {
        "name": "Grapes",
        "colors": ["purple", "green"],
        "in_season": false
    },
    {
        "name": "Lime",
        "colors": ["green"],
        "in_season": false
    },
    {
        "name": "Banana",
        "colors": ["yellow"],
        "in_season": false
    },
    {
        "name": "Watermelon",
        "colors": ["red"],
        "in_season": false
    },
    {
        "name": "Blueberry",
        "colors": ["blue"],
        "in_season": true
    },
    {
        "name": "Coconut",
        "colors": ["white"],
        "in_season": true
    }
];
const fieldMatches = (value, compareValue) => !!compareValue && value.toUpperCase().includes(compareValue.toUpperCase());
const colorMatches = (colors, compareValue) => !!compareValue && colors.some(color => fieldMatches(color, compareValue));
/**
 * Dynamically match fruit from query paramater
 * @param key
 * @param value
 * @param fruit
 * @returns fruit match based on queryParam
 */
const queryFilter = (key, value, fruit) => {
    const { name, colors, in_season } = fruit;
    if (fruit_constants_1.NAME === key) {
        return fieldMatches(name, value);
    }
    if (fruit_constants_1.COLOR === key) {
        return colorMatches(colors, value);
    }
    if (fruit_constants_1.IN_SEASON === key) {
        if (fruit_constants_1.IN === value) {
            return in_season;
        }
        if (fruit_constants_1.OUT === value) {
            return !in_season;
        }
    }
    return false;
};
/**
 * Dynamically match fruit from query paramaters
 * @param queryParams
 * @param currentFruit
 * @returns fruit match based on queryParams
 */
const fruitMatches = (queryParams, currentFruit) => queryParams
    .every((queryParam) => queryFilter(queryParam.key, queryParam.value, currentFruit));
/**
 * Maps dbFruit to iFruit
 * @param dbFruit
 * @returns iFruit
 */
const mapFruit = (dbFruit) => ({
    name: dbFruit.name,
    colors: dbFruit.colors,
    inSeason: dbFruit.in_season,
});
/**
 * Filters fruit list by query parameters
 * @param queryParams
 * @returns filtered fruit list
 */
const queryFruits = (queryParams) => (dbFruits.reduce((fruitList, currentFruit) => {
    if (fruitMatches(queryParams, currentFruit)) {
        fruitList.push(mapFruit(currentFruit));
    }
    return fruitList;
}, []));
exports.queryFruits = queryFruits;
/**
 *
 * @returns complete fruit list
 */
const getFruits = () => dbFruits.map(currentFruit => mapFruit(currentFruit));
exports.getFruits = getFruits;
