// local seed
import { AxiosResponse } from 'axios';
import { getAllBeers } from '../src/pages/api/services';
import { BeerData } from '../src/types/beers';
// import { beerData } from '../src/seed';

// get beers data from DB
export const getBeersAsync = async () => {
    const res = await getAllBeers();
    return res.data;
};

// get local seed data
// export const getLocalBeersId = () => {
//     const beers = beerData;
//     return beers.map(beer => {
//         return {
//             params: {
//                 id: beer.id
//             }
//         };
//     });
// };

export const getDbBeersId = async () => {
    const beers = await getBeersAsync();
    return beers.map((beer: BeerData) => {
        return {
            params: {
                id: beer._id!
            }
        };
    });
};

export const getBeerData = async (id: string) => {
    const beers = await getBeersAsync();
    const data = beers.find((beer: BeerData) => beer._id === id)!;
    return data;
};