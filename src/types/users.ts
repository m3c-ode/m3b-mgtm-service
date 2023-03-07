import { AddressData } from "./addresses";

export type UserData = {
    _id: string;
    name?: string;
    businessId?: string;
    company?: string;
    addresses: AddressData[];
    role: 
};

export enum UserRolesEnum {
    Admin = "admin",
    BOwner = 'business owner',
    BUser = 'business user',
    Client = 'client'
}