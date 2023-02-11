import { BeerData, BeersStylesEnum, BeersStatusEnum } from "./types/beers";

export let beerData: BeerData[] = [
    {
        id: '1',
        name: 'Super Lager',
        style: BeersStylesEnum.Lager,
        brewedOn: '2020-01-01',
        availableOn: '2020-01-14',
        status: BeersStatusEnum.Ready,
        abv: 5.0,
        ibu: 22,
        qty: {
            total: 1000
        }
    },
    {
        id: '2',
        name: "She's so Belle",
        style: BeersStylesEnum.PaleAle,
        brewedOn: '2020-01-01',
        availableOn: '2020-01-14',
        status: BeersStatusEnum.Fermenting,
        abv: 5.5,
        ibu: 35,
        qty: {
            total: 2000
        }
    },
    {
        id: '3',
        name: 'Fit for Breakfast',
        style: BeersStylesEnum.Stout,
        brewedOn: '2020-01-01',
        availableOn: '2020-01-14',
        status: BeersStatusEnum.Conditioning,
        abv: 8.2,
        ibu: 32,
        qty: {
            total: 1000
        }
    },
];