import { ObjectId } from 'mongodb';
import { AddressData } from "./addresses";

export type UsersTableProps = {
    data?: UserData[];
    domains?: any[];
    isLoading: boolean;
    title?: () => JSX.Element;
};

export type UserData = {
    _id: string | ObjectId;
    name: string;
    email: string;
    domain?: string;
    // businessId?: string | ObjectId;
    // company?: string;
    // business?: BusinessData;
    addresses?: AddressData[];
    role: UserRolesEnum;
};

export type CreateUserInput = {
    name: string;
    email: string;
    pwd?: string;
    domain: string;
    addresses?: AddressData[];
    role: UserRolesEnum;
};

export enum UserRolesEnum {
    Admin = "Admin",
    BOwner = 'Business Owner',
    BUser = 'Business User',
    Client = 'Client'
}

// export type BusinessData = {
//     _id: string | ObjectId;
//     domain: string;
//     name: string;
// };