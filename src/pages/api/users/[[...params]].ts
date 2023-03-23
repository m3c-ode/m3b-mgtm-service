import { ObjectId, Timestamp } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { doesDomainExist, doesUserExist, getDomainUsers } from "../../../../lib/users";
import getDbCollection from "../../../../lib/getCollection";
import { CreateUserInput, UserRolesEnum } from "../../../types/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { hash } from 'bcrypt';
// import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({ message: "Access restricted. You must be logged in." });
        return;
    } const collection = await getDbCollection("users");

    const { role: userRole, domain, email } = session?.user ?? {};

    switch (req.method) {
        case 'POST':
            try {
                // When creating a business owner, need to check if domain not already exists. There can only be 1 doamin per business (owner)
                const newUser: CreateUserInput = req.body;
                if (newUser.role === UserRolesEnum.BOwner) {
                    const domainExists = await doesDomainExist(newUser.domain);
                    if (domainExists) {
                        return res.status(409).json({ message: 'Error creating Business Owner: Domain already exists' });
                    }
                }
                const userExists = await doesUserExist(newUser.email);
                if (userExists) {
                    return res.status(409).json({ message: 'Error creating User: User with same email already exists' });
                }
                // newUser.pwd = await hash(newUser.pwd, 12)
                const result = await (Array.isArray(newUser)
                    ? collection.insertMany(newUser)
                    : collection.insertOne({
                        ...newUser,
                        pwd: await hash(newUser.pwd!, 12),
                        createdOn: new Date()
                    },
                    ));
                res.status(201)
                    .json(result);

            } catch (error: any) {
                console.log("🚀 ~ file: [[...params]].ts:20 ~ handler ~ POST error:", error);
                res.status(500).json({ message: 'Error adding new user' });
                throw new Error(error).message;
            }
            break;
        case 'DELETE':
            try {
                const [_id] = req.query.params as string[];
                const user = await collection.deleteOne({ _id: new ObjectId(_id) });
                res.json(user);
            } catch (error) {
                res.status(500).json({ message: 'Error deleting product' });
            }
            break;
        case 'GET':
            try {
                // if user is Admin, fetchAllUsers
                if (userRole === UserRolesEnum.Admin) {
                    const users = await collection.find({}).toArray();
                    res.status(200).json(users);
                }
                if (userRole === UserRolesEnum.BOwner) {
                    const usersList = await getDomainUsers(domain!);
                    res.status(200).json(usersList);
                }
                // else fetch domain users
            } catch (error) {
                console.log("🚀 ~ file: index.ts:22 ~ handler ~ get error", error);
                res.status(500).json({ message: 'Error fetching users' });
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

                const user = await collection.findOne({ _id: new ObjectId(id) });
                res.status(200).json(user);
            } catch (error) {
                console.log("🚀 ~ file: index.ts:49 ~ handler ~ patch error", error);
                res.status(500).json({ message: 'Error updating beer' });
            }
            break;
        default:
            break;
    }
}