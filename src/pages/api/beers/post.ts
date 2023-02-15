import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import { BeerData } from "../../../types/beers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("beers");

        console.log('req.body: ' + req.body);
        // const {
        //     id,
        //     name,
        //     style,
        //     brewedOn,
        //     availableOn,
        //     status, 
        //     ibu,
        //     qty
        // }: BeerData = req.body
        const newBeer: BeerData = req.body;


        const beer = await collection.insertOne(newBeer);

        // collection.insertMany()
        // res.status(200).json(newBeer);
        res.json(beer);
    } catch (error: any) {
        console.log('error: ' + error);

        // res.status(500).json({ message: error.message });
        throw new Error(error).message;
    }
}