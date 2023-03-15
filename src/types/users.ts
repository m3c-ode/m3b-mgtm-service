import { ObjectId } from 'mongodb';
import { AddressData } from "./addresses";

export type UserData = {
    _id: string | ObjectId;
    name: string;
    email: string;
    pwd?: string;
    domain?: string;
    // businessId?: string | ObjectId;
    // company?: string;
    // business?: BusinessData;
    addresses?: AddressData[];
    role: UserRolesEnum;
};

export enum UserRolesEnum {
    Admin = "admin",
    BOwner = 'business owner',
    BUser = 'business user',
    Client = 'client'
}

// export type BusinessData = {
//     _id: string | ObjectId;
//     domain: string;
//     name: string;
// };