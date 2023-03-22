// Optional catch all API routes after api/beers/ [[...params]]


import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getDomainBeers } from "../../../../lib/beers";
import clientPromise from "../../../../lib/mongodb";
import type { BeerData, NewBeerData } from "../../../types/beers";
import { UserRolesEnum } from "../../../types/users";
import { authOptions } from "../auth/[...nextauth]";

// base default url here?

// const allowCors = (fn: any) => async (req: any, res: any) => {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     );
//     if (req.method === 'OPTIONS') {
//         // res.status(200).end();
//         res.status(200).json({});
//         return;
//     }
//     return await fn(req, res);
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    // creates and use a db called "test"
    const db = client.db();
    const collection = db.collection("beers");
    const session = await getServerSession(req, res, authOptions);
    const { role: userRole, domain, email } = session?.user ?? {};

    switch (req.method) {
        case 'GET':
            try {
                if (userRole === UserRolesEnum.Admin) {
                    const beers = await collection.find({}).toArray();
                    res.status(200).json(beers);
                }
                if (userRole === UserRolesEnum.BOwner) {
                    const usersList = await getDomainBeers(domain!);
                    res.status(200).json(usersList);
                }
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
            // case 'PUT':
            try {
                const updateData = req.body;
                delete updateData._id;
                const [id] = req.query.params as string[];
                await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...req.body } },
                    // {
                    // new: true,
                    // }
                );

                const beer = await collection.findOne({ _id: new ObjectId(id) });
                res.status(200).json(beer);
            } catch (error) {
                console.log("🚀 ~ file: index.ts:49 ~ handler ~ patch error", error);
                res.status(500).json({ message: 'Error updating beer' });
            }
            break;
        case 'DELETE':
            try {
                const [_id] = req.query.params as string[];
                const beer = await collection.deleteOne({ _id: new ObjectId(_id) });
                res.json(beer);
            } catch (error) {
                res.status(500).json({ message: 'Error deleting product' });
            }
            break;
        default:
            // res.status(405).end();
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}

// module.exports = allowCors(handler);