import { ObjectId, Timestamp } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { adjustInventoryVolumes, getDomainDeliveries } from "../../../../lib/deliveries";
// import { doesDeliveryExist } from "../../../../lib/deliveries";
import getDbCollection from "../../../../lib/getCollection";
import { getDomainUsers } from "../../../../lib/users";
import { DeliveryData, DeliveryStatusEnums, NewDeliveryInput } from "../../../types/deliveries";
import { UserRolesEnum } from "../../../types/users";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    const collection = await getDbCollection("deliveries");
    const { role: userRole, domain, email } = session?.user ?? {};

    switch (req.method) {
        case 'POST':
            try {
                const newDelivery: NewDeliveryInput = req.body;

                // Check if volume are allowed
                const result = await collection.insertOne({ ...newDelivery, status: "Pending", createdOn: new Date() });
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
                res.status(500).json({ message: 'Error deleting delivery' });
            }
            break;
        case 'GET':
            try {
                if (userRole === UserRolesEnum.Admin) {
                    const deliveries = await collection.find({}).toArray();
                    res.status(200).json(deliveries);
                }
                if (userRole === UserRolesEnum.BOwner) {
                    const usersList = await getDomainDeliveries(domain!);
                    res.status(200).json(usersList);
                }
            } catch (error) {
                console.log("🚀 ~ file: index.ts:22 ~ handler ~ get error", error);
                res.status(500).json({ message: 'Error fetching deliveries' });
            }
            break;
        case 'PATCH':
            try {
                const updateData: DeliveryData = req.body;
                console.log("🚀 ~ file: [[...params]].ts:48 ~ handler ~ updateData:", updateData);
                delete updateData._id;
                if (updateData.status === DeliveryStatusEnums.InTransit || updateData.status === DeliveryStatusEnums.Delivered) {
                    await adjustInventoryVolumes(updateData);
                    console.log("🚀 ~ file: [[...params]].ts:50 ~ handler ~ adjustInventoryVolumes:", adjustInventoryVolumes);
                }

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
                res.status(500).json({ message: 'Error updating delivery' });
            }
            break;
        default:
            break;
    }
}