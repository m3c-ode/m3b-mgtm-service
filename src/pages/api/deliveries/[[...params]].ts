import { ObjectId, Timestamp } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import { doesDeliveryExist } from "../../../../lib/deliveries";
import getDbCollection from "../../../../lib/getCollection";
import { NewDeliveryInput } from "../../../types/deliveries";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const collection = await getDbCollection("deliveries");

    switch (req.method) {
        case 'POST':
            try {
                const newDelivery: NewDeliveryInput = req.body;

                // Check if volume are allowed


                // const doesExist = await doesDeliveryExist(newDelivery.name, newDelivery.email, newDelivery.address.street1);
                // if (doesExist) {
                //     return res.status(409).json({ message: 'Error creating Delivery: Delivery with same credentials already exists' });
                // }
                // const result = await (Array.isArray(newDelivery)
                //     ? collection.insertMany(newDelivery)
                //     : collection.insertOne({ ...newDelivery, createdOn: new Date() },
                //     ));
                const result = await collection.insertOne({ ...newDelivery, createdOn: new Date() });
                res.status(201)
                    .json(result);

            } catch (error: any) {
                console.log("🚀 ~ file: [[...params]].ts:20 ~ handler ~ POST error:", error);
                res.status(500).json({ message: 'Error adding new delivery' });
                throw new Error(error).message;
            }
            break;
        case 'DELETE':
            try {
                const [_id] = req.query.params as string[];
                const delivery = await collection.deleteOne({ _id: new ObjectId(_id) });
                res.json(delivery);
            } catch (error) {
                res.status(500).json({ message: 'Error deleting product' });
            }
            break;
        case 'GET':
            try {
                const deliverys = await collection.find({}).toArray();
                res.status(200).json(deliverys);
            } catch (error) {
                console.log("🚀 ~ file: index.ts:22 ~ handler ~ get error", error);
                res.status(500).json({ message: 'Error fetching deliverys' });
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

                const delivery = await collection.findOne({ _id: new ObjectId(id) });
                res.status(200).json(delivery);
            } catch (error) {
                console.log("🚀 ~ file: index.ts:49 ~ handler ~ patch error", error);
                res.status(500).json({ message: 'Error updating beer' });
            }
            break;
        default:
            break;
    }
}