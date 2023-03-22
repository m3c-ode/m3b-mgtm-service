import { BeerData } from "./beers";

export type ProductsTableProps = {
    data?: ProductData[];
    isLoading: boolean;
    title?: () => JSX.Element;
};

export type ProductData = {
    _id: string;
    name: string;
    domain?: string;
    quantity: number;
    receivedOn: string;

};