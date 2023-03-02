import { ObjectId } from 'mongodb';
import { getAllBeers } from '../src/pages/api/services';
import { BeerData } from '../src/types/beers';
import getDbCollection from './getCollection';

// get beers data from DB, serveer side directly
export const getBeersAsync = async () => {
    const collection = await getDbCollection('beers');
    const beers = await collection.find({}).toArray();
    return JSON.parse(JSON.stringify(beers));
};

export const getDbBeersId = async () => {
    const beers = await getBeersAsync();
    // console.log("🚀 ~ file: beers.ts:36 ~ getDbBeersId ~ beers", beers);
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

export const dbUpdateBeer = async (id: string | ObjectId, beerData: BeerData) => {
    const collection = await getDbCollection("beers");
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...beerData } },
        // {
        // new: true,
        // }
    );
    const updatedBeer = await collection.findOne({ _id: new ObjectId(id) });
    return updatedBeer;
};
