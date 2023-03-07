import { ObjectId } from "mongodb";
import { AddressData, NewAddressInput } from "./addresses";

export type ClientsTableProps = {
    data?: ClientData[];
    isLoading: boolean;
    title?: () => JSX.Element;
};

export type NewClientInput = {
    name: string;
    address: NewAddressInput;
    email: string;
    type: ClientTypeEnum;
};

export type ClientData = NewClientInput & {
    _id?: string;
    address: AddressData | NewAddressInput;
    createdOn?: string | Date;
    updatedOn?: string | Date;
};

export enum ClientTypeEnum {
    Restau = "Restaurant",
    LStore = "Liquor Store",
}