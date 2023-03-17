import { UserData, UserRolesEnum } from "../src/types/users";
import getDbCollection from "./getCollection";

export const getUserDataWithId = (id: string) => {

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
        const user = await collection.findOne({ $and: [{ email }, { pwd: password }] }) as UserData;
        return user;
    } catch (error) {
        console.log("🚀 ~ file: [...nextauth].ts:58 ~ authorize ~ error:", error);
        throw new Error("Invalid Login");
    }
};

export const getAllUsersAsync = async () => {
    // gettign all the users, but not the admin
    const collection = await getDbCollection('users');
    const users = await collection.find({ role: { $ne: `${UserRolesEnum.Admin}`, $exists: true } }).toArray();
    console.log("🚀 ~ file: users.ts:15 ~ getAllUsersAsync ~ users:", users);
    return JSON.parse(JSON.stringify(users.filter(user => user.role !== 'admin')));
};

export const getDomainUsers = async (domain: string) => {
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