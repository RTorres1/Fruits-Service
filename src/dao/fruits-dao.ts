
import type { iFruit, iQueryFilter } from '../models/fruit-types';
import { NAME, COLOR, IN_SEASON, IN, OUT } from '../constants/fruit-constants';

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

const fieldMatches = (value: string, compareValue: string): boolean => !!compareValue && value.toUpperCase().includes(compareValue.toUpperCase());

const colorMatches = (colors: string[], compareValue: string): boolean => !!compareValue && colors.some(color => fieldMatches(color, compareValue));

/**
 * Dynamically match fruit from query paramater
 * @param key 
 * @param value 
 * @param fruit 
 * @returns fruit match based on queryParam
 */
const queryFilter = (key: string, value: string, fruit: any): boolean => {

    const { name, colors, in_season } = fruit;

    if(NAME === key){
        return fieldMatches(name, value);
    }

    if(COLOR === key){
        return colorMatches(colors, value);
    }

    if(IN_SEASON === key){
        if(IN === value){
            return in_season;
        }
        if(OUT === value){
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
const fruitMatches = (queryParams: any[], currentFruit: any): boolean =>
    queryParams
        .every((queryParam: iQueryFilter) => queryFilter(queryParam.key, queryParam.value, currentFruit));

/**
 * Maps dbFruit to iFruit
 * @param dbFruit 
 * @returns iFruit
 */
const mapFruit = (dbFruit: any): iFruit => ({
        name: dbFruit.name,
        colors: dbFruit.colors,
        inSeason: dbFruit.in_season,
    });

/**
 * Filters fruit list by query parameters
 * @param queryParams 
 * @returns filtered fruit list
 */
export const queryFruits = (queryParams: iQueryFilter[]): iFruit[] => (
    dbFruits.reduce((fruitList, currentFruit): iFruit[] => {
        if(fruitMatches(queryParams, currentFruit)){
            fruitList.push(mapFruit(currentFruit));
        }

        return fruitList;
    }, []));

/**
 * 
 * @returns complete fruit list
 */
export const getFruits = (): iFruit[] => dbFruits.map(currentFruit => mapFruit(currentFruit));