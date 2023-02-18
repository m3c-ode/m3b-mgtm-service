import { getAllBeers } from '../src/pages/api/services';
import { BeerData } from '../src/types/beers';
import clientPromise from './mongodb';

export const getDbCollection = async (name: string) => {
    const client = await clientPromise;
    // creates and use a db called "test"
    const db = client.db();
    const collection = db.collection(name);
    return collection;
};

// get beers data from DB, serveer side directly
export const getBeersAsync = async () => {
    const collection = await getDbCollection('beers');
    const beers = await collection.find({}).toArray();
    return JSON.parse(JSON.stringify(beers));
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
    console.log("🚀 ~ file: beers.ts:36 ~ getDbBeersId ~ beers", beers);
    if (beers.map) {
        return beers.map((beer: BeerData) => {
            return {
                params: {
                    id: beer._id!
                }
            };
        });
    } else {
        return [];
    }
};

export const getBeerData = async (id: string) => {
    const beers = await getBeersAsync();
    const data = beers.find((beer: BeerData) => beer._id === id)!;
    return data;
};

// gets data from the API request
export const getBeersAsyncAPI = async () => {
    const res = await getAllBeers();
    return res.data;
};