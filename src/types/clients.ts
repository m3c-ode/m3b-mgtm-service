import { ObjectId } from "mongodb";
import { AddressData } from "./addresses";

export type ClientsTableProps = {
    data?: ClientData[];
    isLoading: boolean;
    title?: () => JSX.Element;
};

export type ClientData = {
    _id: string | ObjectId;
    name: string;
    address: string | AddressData;
    email: string;
    type: ClientTypeEnum;
};

export enum ClientTypeEnum {
    Restau = "Restaurant",
    LStore = "Liquor Store",
}