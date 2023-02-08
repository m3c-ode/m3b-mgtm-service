export type BeersTableProps = {
    data: BeerData[];
    isLoading: boolean;
    title?: () => JSX.Element;

};

export type BeerData = {
    id: string,
    style: BeersStylesEnum;
    name?: string,
    abv?: number,
    ibu?: number,
    description?: string,
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

}

export enum BeersStatusEnum {
    Projected = 'Projected',
    Fermenting = 'Fermenting',
    Conditioning = 'Conditioning',
    Ready = 'Ready',
    Unavailable = 'Unavailable',
}