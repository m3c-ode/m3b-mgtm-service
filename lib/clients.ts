import { ObjectId } from "mongodb";
import { NewClientInput } from "../src/types/clients";
import getDbCollection from "./getCollection";

export const createNewClient = async (data: NewClientInput) => {
    const collection = await getDbCollection("clients");
    const res = collection.insertOne(data);
    return res;
};


export const getAllClientsAsync = async () => {
    const collection = await getDbCollection('clients');
    const clients = await collection.find({}).toArray();
    return JSON.parse(JSON.stringify(clients));
};

// Check if there are no duplicate before creating
export const doesClientExist = async (name: string, email: string, street1: string) => {
    const collection = await getDbCollection("clients");
    const res = await collection
        .count({
            $and: [
                { name: name.toUpperCase() },
                { email: email.toUpperCase() },
                { 'address.street1': street1.toUpperCase() },
            ]
        },
            {
                collation: { locale: 'en', strength: 2 }
            }
        )
        ;
    if (res) return true;
    else return false;
};

export const insertClient = async (data: NewClientInput) => {
    const collection = await getDbCollection('clients');

    try {

        doesClientExist(data.name, data.email, data.address.street1);
        const result = await collection.insertOne(data);
        return result;
    } catch (error) {
        console.log("🚀 ~ file: clients.ts:27 ~ insertClients ~ error:", error);
        throw new Error('Error inserting client');
    }
};

export const deleteClient = async (id: string) => {
    const collection = await getDbCollection('clients');
    try {
        const client = await collection.deleteOne({ _id: id });
        return Promise.resolve("Client succesfully deleted");
    } catch (error: any) {
        console.log("🚀 ~ file: clients.ts:93 ~ deleteClient ~ error:", error);
        console.log("error deleting client");
        throw new Error('Error deleting client');
    }
};

export const getClientData = async (clientId: string) => {
    const collection = await getDbCollection('clients');
    try {
        const client = await collection.findOne({ _id: new ObjectId(clientId) });
        return JSON.parse(JSON.stringify(client));
    } catch (error) {
        console.log("🚀 ~ file: clients.ts:104 ~ getClientData ~ error:", error);
    }

};

export const getDomainClients = async (domain: string) => {
    // get all the clients, but per domain
    const collection = await getDbCollection('clients');
    const clients = await collection.find({ domain: { $eq: `${domain}`, $exists: true } },
        {
            collation: { locale: 'en', strength: 2 }
        }
    ).toArray();
    return JSON.parse(JSON.stringify(clients));
};