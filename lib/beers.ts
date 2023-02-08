// local seed
import { beerData } from '../src/seed';

// get beers data from DB
export const getBeersAsync = async () => {
    // const res = await fetch('https://api.beers.com/api/v1/beers');
};

// get local seed data
export const getLocalBeersId = () => {
    const beers = beerData;
    return beers.map(beer => {
        return {
            params: {
                id: beer.id
            }
        };
    });
};

export const getLocalBeersData = () => {
    return beerData;
};

export const getBeerData = (id: string) => {
    const data = beerData.find(beer => beer.id === id)!;
    return data;
};