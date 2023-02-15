import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongodb";
import { BeerData } from "../../../types/beers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        // case 'GET':
        //     try {
        //         const products = await Product.find({});
        //         res.status(200).json(products);
        //     } catch (error) {
        //         res.status(500).json({ message: 'Error fetching products' });
        //     }
        //     break;
        case 'POST':
            const newBeers: BeerData | BeerData[] = req.body;

            try {
                const client = await clientPromise;
                // creates and use a db called "test"
                const db = client.db();
                const collection = db.collection("beers");
                const result = await (Array.isArray(newBeers)
                    ? db.collection('beers').insertMany(newBeers)
                    : db.collection('beers').insertOne(newBeers));

                res
                    .status(201)
                    .json(result);
            } catch (error) {
                res.status(500).json({ message: 'Error adding new beers' });
            }
            break;
        // case 'PUT':
        //     try {
        //         const { id } = req.query;
        //         const product = await Product.findByIdAndUpdate(id, req.body, {
        //             new: true,
        //         });
        //         res.status(200).json(product);
        //     } catch (error) {
        //         res.status(500).json({ message: 'Error updating product' });
        //     }
        //     break;
        // case 'DELETE':
        //     try {
        //         const { id } = req.query;
        //         await Product.findByIdAndDelete(id);
        //         res.status(204).send('');
        //     } catch (error) {
        //         res.status(500).json({ message: 'Error deleting product' });
        //     }
        //     break;
        default:
            // res.status(405).end();
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}