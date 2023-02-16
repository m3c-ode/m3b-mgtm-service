// Optional catch all API routes after api/beers/ [[...params]]


import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import type { BeerData, NewBeerData } from "../../../types/beers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    // creates and use a db called "test"
    const db = client.db();
    const collection = db.collection("beers");
    // console.log('params', req.params);
    console.log('req.query', req.query);
    console.log('req.body', req.body);
    console.log("🚀 ~ file: index.ts:16 ~ handler ~ req.method", req.method);


    switch (req.method) {
        case 'GET':
            try {
                const beers = await collection.find({}).toArray();
                // console.log("🚀 ~ file: index.ts:15 ~ handler ~ beers", beers);
                res.status(200).json(beers);
            } catch (error) {
                console.log("🚀 ~ file: index.ts:22 ~ handler ~ get error", error);
                res.status(500).json({ message: 'Error fetching beers' });
            }
            break;
        case 'POST':
            const newBeers: NewBeerData | NewBeerData[] = req.body;
            try {
                const result = await (Array.isArray(newBeers)
                    ? db.collection('beers').insertMany(newBeers)
                    : db.collection('beers').insertOne(newBeers));

                res
                    .status(201)
                    .json(result);
            } catch (error: any) {
                console.log("🚀 ~ file: index.ts:36 ~ handler ~ post error", error);
                res.status(500).json({ message: 'Error adding new beers' });
                throw new Error(error).message;

            }
            break;
        case 'PATCH':
        case 'PUT':
            try {
                // const { _id } = req.body;
                const updateData = req.body;
                delete updateData._id;
                const [id] = req.query.params as string[];
                console.log('req.query.param', req.query.params);
                console.log("🚀 ~ file: [[...params]].ts:55 ~ handler ~ id", id);
                // console.log("🚀 ~ file: index.ts:49 ~ handler ~ _id", _id);
                await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...req.body } },
                    // {
                    // new: true,
                    // }
                );

                const beer = await collection.findOne({ _id: new ObjectId(id) });
                console.log("🚀 ~ file: index.ts:53 ~ handler ~ beer", beer);
                res.status(200).json(beer);
            } catch (error) {
                console.log("🚀 ~ file: index.ts:49 ~ handler ~ patch error", error);
                res.status(500).json({ message: 'Error updating beer' });
            }
            break;
        //     case 'DELETE':
        //         try {
        //             const { id } = req.query;
        //             await collection.deleteOne({ _id }, {}});
        //         res.status(204).send('');
        // } catch (error) {
        //     res.status(500).json({ message: 'Error deleting product' });
        // }
        // break;
        default:
            // res.status(405).end();
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}