import { ObjectId, Timestamp } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import { getDbCollection } from "../../../../lib/beers";
import { doesClientExist } from "../../../../lib/clients";
import getDbCollection from "../../../../lib/getCollection";
// import { getDbCollection } from "../../../../lib/functions";
import clientPromise from "../../../../lib/mongodb";
import { NewClientInput } from "../../../types/clients";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const collection = await getDbCollection("clients");

    switch (req.method) {
        case 'POST':
            try {
                const newClient: NewClientInput = req.body;
                const doesExist = await doesClientExist(newClient.name, newClient.email, newClient.address.street1);
                if (doesExist) {
                    return res.status(409).json({ message: 'Error creating Client: Client with same credentials already exists' });
                }
                const result = await (Array.isArray(newClient)
                    ? collection.insertMany(newClient)
                    : collection.insertOne({ ...newClient, createdOn: new Date() },
                        // {
                        //     $currentDate: {
                        //     }
                        // }
                    ));

                res.status(201)
                    .json(result);

            } catch (error: any) {
                console.log("🚀 ~ file: [[...params]].ts:20 ~ handler ~ POST error:", error);
                res.status(500).json({ message: 'Error adding new client' });
                throw new Error(error).message;
            }
            break;
        case 'DELETE':
            try {
                const [_id] = req.query.params as string[];
                const client = await collection.deleteOne({ _id: new ObjectId(_id) });
                res.json(client);
            } catch (error) {
                res.status(500).json({ message: 'Error deleting product' });
            }
            break;
        case 'GET':
            try {
                const clients = await collection.find({}).toArray();
                res.status(200).json(clients);
            } catch (error) {
                console.log("🚀 ~ file: index.ts:22 ~ handler ~ get error", error);
                res.status(500).json({ message: 'Error fetching clients' });
            }
            break;
        case 'PATCH':
            try {
                const updateData = req.body;
                delete updateData._id;
                const [id] = req.query.params as string[];
                await collection.updateOne({ _id: new ObjectId(id) },
                    { $set: { ...req.body, updatedOn: new Date() } },
                    // {
                    // new: true,
                    // }
                );

                const client = await collection.findOne({ _id: new ObjectId(id) });
                res.status(200).json(client);
            } catch (error) {
                console.log("🚀 ~ file: index.ts:49 ~ handler ~ patch error", error);
                res.status(500).json({ message: 'Error updating beer' });
            }
            break;
        default:
            break;
    }
}