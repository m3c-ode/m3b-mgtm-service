import { Timestamp } from "mongodb";
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
                console.log("🚀 ~ file: [[...params]].ts:17 ~ handler ~ doesExist:", doesExist);
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

        default:
            break;
    }
}