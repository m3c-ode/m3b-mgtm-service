import { ObjectId } from "mongodb";
import { NewClientInput } from "../src/types/clients";
import getDbCollection from "./getCollection";
// import getDbCollection from "./functions";
import clientPromise from "./mongodb";
// import { getDbCollection } from "./beers";
// import { getDbCollection } from "./functions";

// const getDbCollection = async (name) => {
//     const client = await clientPromise;
//     // creates and use a db called "test"
//     const db = client.db();
//     const collection = db.collection(name);
//     return collection;
// };



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
    // try {

    const res = await collection
        // .findOne({
        // .find({
        //     $and: [
        //         { name: name.toUpperCase() },
        //         { email: email.toUpperCase() },
        //         { 'address.street1': street1.toUpperCase() },
        //     ]
        //     //     , email: email, street1 }]
        //     // name: name.toUpperCase(),
        //     // email: email.toUpperCase(),
        //     // street1: street1.toUpperCase(),
        // })
        // Allows case insensitivity Search
        // .collation({ locale: 'en', strength: 2 })
        // .toArray();
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
    console.log("🚀 ~ file: clients.ts:35 ~ doesClientExist ~ res:", res);
    if (res) return true;
    else return false;
    // } catch (err) {
    //     console.log("🚀 ~ file: clients.ts:42 ~ doesClientExist ~ err:", err);
    //     console.log("couldn't check if client exist");
    // }
};

export const insertClients = async (data: NewClientInput | NewClientInput[]) => {
    const collection = await getDbCollection('clients');

    try {
        if (Array.isArray(data)) {
            const result = await collection.insertMany(data);
            console.log("🚀 ~ file: clients.ts:46 ~ insertClients ~ result:", result);
            return result;
        } else {
            doesClientExist(data.name, data.email, data.address.street1);
            const result = await collection.insertOne(data);
            console.log("🚀 ~ file: clients.ts:51 ~ insertClients ~ result:", result);
            return result;
        }
        // const result = await (Array.isArray(data)
        //     ?
        //     collection.insertMany(data)
        //     :
        //     (doesClientExist(data.name, data.email, data.address.street1),
        //         collection.insertOne(data)
        //     ));
        // console.log("🚀 ~ file: clients.ts:25 ~ insertClients ~ Success result:", result);
    } catch (error) {
        console.log("🚀 ~ file: clients.ts:27 ~ insertClients ~ error:", error);
    }
};

export const deleteClient = async (id: string) => {
    const collection = await getDbCollection('clients');
    try {
        const client = await collection.deleteOne({ _id: id });
        console.log("🚀 ~ file: clients.ts:90 ~ deleteClient ~ client:", client);
        return Promise.resolve("Client succesfully deleted");
    } catch (error) {
        console.log("🚀 ~ file: clients.ts:93 ~ deleteClient ~ error:", error);
        console.log("error deleting client");
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