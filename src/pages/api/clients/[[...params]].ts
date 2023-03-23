import { ObjectId, Timestamp } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { doesClientExist, getDomainClients } from "../../../../lib/clients";
import getDbCollection from "../../../../lib/getCollection";
import { NewClientInput } from "../../../types/clients";
import { UserRolesEnum } from "../../../types/users";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const collection = await getDbCollection("clients");
    const { role: userRole, domain, email } = session?.user ?? {};

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
                if (userRole === UserRolesEnum.Admin) {
                    const clients = await collection.find({}).toArray();
                    res.status(200).json(clients);
                }
                if (userRole === UserRolesEnum.BOwner) {
                    const clientsList = await getDomainClients(domain!);
                    res.status(200).json(clientsList);
                }
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