import assert from 'assert';
import { ObjectId } from 'mongodb';
import { getAllBeers } from '../src/pages/api/services';
import { BeerData, BeerVolumes } from '../src/types/beers';
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
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...beerData }, $currentDate: { updatedOn: true } },
    );
    const updatedBeer = await collection.findOne({ _id: new ObjectId(id) });
    return updatedBeer;
};

export const updateBeerQuantity = async (id: string, qty: BeerVolumes) => {
    const collection = await getDbCollection("beers");
    try {

        const updateResult = await collection.updateOne({ _id: new ObjectId(id) },
            {
                $inc: {
                    'qty.355ml': -qty['355ml']! || 0,
                    'qty.473ml': -qty['473ml']! || 0,
                    'qty.650ml': -qty['650ml']! || 0,
                    'qty.19Lkegs': -qty['19Lkegs']! || 0,
                    'qty.38Lkegs': -qty['38Lkegs']! || 0,
                    'qty.57Lkegs': -qty['57Lkegs']! || 0,
                    'qty.total': -qty['total']! || 0,
                },
                $currentDate: { updatedOn: true }
            });
        console.log("🚀 ~ file: beers.ts:60 ~ updateBeerQuantity ~ updateResult:", updateResult);
        const beer = await collection.findOne({ _id: new ObjectId(id) }) as unknown as BeerData;
        if (updateResult.acknowledged && updateResult.matchedCount) return true;
        else return false;
    } catch (error: any) {
        console.log("🚀 ~ file: beers.ts:67 ~ updateBeerQuantity ~ error:", error.message);
        throw new Error(error.message);
    }

};
