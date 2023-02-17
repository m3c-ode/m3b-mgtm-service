import { ObjectId } from "mongodb";

export type BeersTableProps = {
    data: BeerData[];
    isLoading: boolean;
    title?: () => JSX.Element;

};

export type BeerData = NewBeerData & {
    _id: string;
};

export type NewBeerData = {
    id?: string,
    name?: string,
    description?: string,
    company?: string,
    brewer?: string,
    style: BeersStylesEnum;
    abv?: number,
    ibu?: number,
    status: BeersStatusEnum,
    brewedOn: string | Date,
    availableOn: string | Date,
    qty: {
        '12oz'?: number,
        '24oz'?: number,
        '5Galkegs?'?: number,
        '10GalKegs'?: number,
        '15GalKegs'?: number,
        total: number;
    };
};


export enum BeersStylesEnum {
    Lager = 'Lager',
    PaleAle = 'Pale Ale',
    IPA = 'IPA',
    Pilsner = 'Pilsner',
    Porter = 'Porter',
    Stout = 'Stout',
    Sour = 'Sour',
    Saison = 'Saison',
    Belgian = 'Belgian',
    Englsih = 'English Ale',
    ESB = 'ESB',
    Wheat = 'Wheat Ale',
    // key = "key"
}

export enum BeersStatusEnum {
    Projected = 'Projected',
    Fermenting = 'Fermenting',
    Conditioning = 'Conditioning',
    Ready = 'Ready',
    Unavailable = 'Unavailable',
}