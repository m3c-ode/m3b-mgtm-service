import { AddressData } from "./addresses";
import { BeerData, BeerVolumes } from "./beers";
import { ClientData } from "./clients";

export type DeliveriesTableProps = {
    deliveriesData?: DeliveryData[];
    clientsData?: ClientData[];
    isLoading?: boolean;
    title?: () => JSX.Element;
};

export type NewDeliveryInput = {
    businessId?: string;
    domain?: string;
    clientId?: string;
    fromAddress: string | AddressData;
    toAddress: string | AddressData;
    products?: DeliveryProducts[];
};

export type DeliveryProducts = {
    beer: {
        // beer name
        label: string,
        // beer _id
        value: string,
    },
    qty: BeerVolumes,
};

export type DeliveryData = NewDeliveryInput & {
    _id?: string;
    status: DeliveryStatusEnums;
};

export enum DeliveryStatusEnums {
    Pending = "Pending",
    InTransit = "In Transit",
    Delivered = 'Delivered'
}