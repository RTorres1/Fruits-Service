import { NAME, COLOR, IN_SEASON, IN, OUT } from '../constants/fruit-constants';
import { getFruits, queryFruits } from '../dao/fruits-dao';
import type { iFruit, iQueryFilter } from '../models/fruit-types';


export const fetchFruits = (name: string, color: string, inSeason: string): iFruit[] =>  {
    const queryParams: iQueryFilter[] = generateQueryParams(name, color, inSeason);
    return queryFruits(queryParams);
}

export const fetchAllFruits = (): iFruit[] => getFruits();

/**
 * @param name 
 * @param color 
 * @param inSeason 
 * @returns query paramater list
 */
const generateQueryParams = (name: string, color: string, inSeason: string): iQueryFilter[] => {
    const queryParams: iQueryFilter[] = [];

    if(!!name){
        queryParams.push({ key: NAME, value: name });
    }
    if(!!color){
        queryParams.push({ key: COLOR, value: color });
    }
    if(inSeason === IN || inSeason === OUT){
        queryParams.push({ key: IN_SEASON, value: inSeason });
    }
    return queryParams;
};