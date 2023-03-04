import { AddressData } from "./addresses";
import { BeerData } from "./beers";

export type NewDeliveryInput = {
    businessId?: string;
    clientId?: string;
    fromAddress?: string | AddressData;
    toAddress?: string | AddressData;
    products?: BeerData[];
};

export type DeliveryData = NewDeliveryInput & {
    _id: string;
};