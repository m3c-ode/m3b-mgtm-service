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
    clientId?: string;
    fromAddress?: string | AddressData;
    toAddress?: string | AddressData;
    products?: DeliveryInput[];
};

export type DeliveryInput = {
    beer: {
        label: string,
        value: string,
    },
    qty: BeerVolumes,
};

export type DeliveryData = NewDeliveryInput & {
    _id: string;
    status: "Pending" | "In Transit" | "Delivered";
};