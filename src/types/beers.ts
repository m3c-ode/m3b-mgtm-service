import { ObjectId } from "mongodb";

export type BeersTableProps = {
    data: BeerData[];
    isLoading: boolean;
    title?: () => JSX.Element;

};

export type BeerData = NewBeerData & {
    _id: string;
    key?: any;
};

export type EditBeerData = Partial<BeerData>;

export type GrainsData = [{
    name: string;
    quantity: number;
    receivedOn?: string | Date;
}];

export type HopsType = 'Pellets' | "Leafs";

export type HopsData = [{
    name: string;
    quantity: number;
    type: HopsType;
    receivedOn?: string | Date;
}];

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
    qty: BeerVolumes,
    grains: GrainsData,
    hops: HopsData;
};

export interface BeerVolumes {
    '355ml'?: number,
    '473ml'?: number,
    '650ml'?: number,
    '19Lkegs'?: number,
    '38Lkegs'?: number,
    '57Lkegs'?: number,
    total?: number;
}


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