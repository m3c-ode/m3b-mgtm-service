import { add } from "date-fns";
import { ObjectId } from "mongodb";
import { UserData, UserRolesEnum } from "../src/types/users";
import getDbCollection from "./getCollection";

export const getUserDataFromId = async (userId: string): Promise<UserData> => {
    try {
        const collection = await getDbCollection("users");
        const client = await collection.findOne({ _id: new ObjectId(userId) });
        return JSON.parse(JSON.stringify(client));
    } catch (error) {
        console.log("🚀 ~ file: clients.ts:104 ~ getClientData ~ error:", error);
        throw new Error('Error fetching user info');
    }
};

export const getUserDataFromEmail = async (email: string): Promise<UserData> => {
    try {
        const collection = await getDbCollection("users");
        const user = collection.findOne({ email });
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        console.log("🚀 ~ file: users.ts:14 ~ getUserDataFromEmail ~ error:", error);
        throw new Error("Couldn't find User");
    }
};

export const doesDomainExist = async (domain: string) => {
    const collection = await getDbCollection("users");
    const res = await collection.count({ domain }, { collation: { locale: "en", strength: 2 } });
    console.log("🚀 ~ file: users.ts:11 ~ doesDomainExist ~ res:", res);
    if (res) return true;
    else return false;
};

export const doesUserExist = async (email: string) => {
    const collection = await getDbCollection("users");
    const res = await collection
        .count({
            // $and: [
            // { email: email.toLowerCase() },
            // { domain: domain?.toUpperCase() },
            // ]
            email: email.toLowerCase()
        },
            {
                collation: { locale: 'en', strength: 2 }
            }
        )
        ;
    console.log("🚀 ~ file: users.ts:30 ~ doesUserExist ~ res:", res);
    if (res) return true;
    else return false;
};

export const getUserDataFromCredentials = async (email: string, password: string) => {
    try {
        const collection = await getDbCollection("users");
        const user = await collection.findOne({ $and: [{ email }, { pwd: password }] });
        return user;
    } catch (error) {
        console.log("🚀 ~ file: [...nextauth].ts:58 ~ authorize ~ error:", error);
        throw new Error("Invalid Login");
    }
};

export const getAllUsersAsync = async (): Promise<UserData[]> => {
    // gettign all the users, but not the admin
    const collection = await getDbCollection('users');
    const users = await collection.find({ role: { $ne: `${UserRolesEnum.Admin}`, $exists: true } }).toArray();
    console.log("🚀 ~ file: users.ts:15 ~ getAllUsersAsync ~ users:", users);
    return JSON.parse(JSON.stringify(users.filter(user => user.role !== 'admin')));
};

export const getDomainUsers = async (domain: string): Promise<UserData[]> => {
    // get all the users, but per domain
    const collection = await getDbCollection('users');
    const users = await collection.find({ domain: { $eq: `${domain}`, $exists: true } },
        {
            collation: { locale: 'en', strength: 2 }
        }
    ).toArray();
    console.log("🚀 ~ file: users.ts:15 ~ getAllUsersAsync ~ users:", users);
    return JSON.parse(JSON.stringify(users.filter(user => user.role !== 'admin')));
};

export const getDomainsList = async ()/* : Promise<string[]> */ => {
    const collection = await getDbCollection('users');
    const domains = await collection.aggregate([
        {
            $match: {
                domain: { $exists: true, $ne: null }
            }
        },
        {
            $group: {
                _id: '$domain',
            }
        },
    ]).toArray();
    console.log("🚀 ~ file: users.ts:81 ~ getDomainsList ~ domains:", domains);
    // const domains = domains.map(item => item._id);
    // return domains.map(item => item._id);
    return JSON.parse(JSON.stringify(domains));
};

export const getDomainAddress = async (domain: string)/* : Promise<string> */ => {
    const collection = await getDbCollection('users');
    try {
        const owner = await collection.findOne({ $and: [{ domain }, { role: UserRolesEnum.BOwner }] }) as unknown as UserData;
        console.log("🚀 ~ file: users.ts:111 ~ getDomainAddress ~ address:", owner);
        return JSON.parse(JSON.stringify(owner.address));
    } catch (error) {
        console.log("🚀 ~ file: users.ts:114 ~ getDomainAddress ~ error:", error);
        throw new Error('Could not retrieve domain address');

    }

};

export const getAllDomainsAddresses = async () => {
    const collection = await getDbCollection('users');
    try {
        // Find all Bowners. Extract the address and send
        const ownerslist = await collection.find({ role: UserRolesEnum.BOwner }).toArray() as unknown as UserData[];
        const domainsAddresses = ownerslist.map(ownerData => ({ name: ownerData.domain, address: ownerData.address }));
        console.log("🚀 ~ file: users.ts:126 ~ getAllDomainsAddresses ~ ownerslist:", ownerslist);
        return JSON.parse(JSON.stringify(domainsAddresses));
    } catch (error) {
        console.log("🚀 ~ file: users.ts:114 ~ getDomainAddress ~ error:", error);
        throw new Error('Could not retrieve domain address');

    }
};