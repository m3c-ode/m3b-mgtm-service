import { BeerData, BeersStylesEnum, BeersStatusEnum } from "./types/beers";

export let beerData: BeerData[] = [
    {
        id: '1',
        style: BeersStylesEnum.Lager,
        brewedOn: '2020-01-01',
        availableOn: '2020-01-14',
        status: BeersStatusEnum.Ready,
        qty: {
            total: 1000
        }
    },
    {
        id: '2',
        style: BeersStylesEnum.PaleAle,
        brewedOn: '2020-01-01',
        availableOn: '2020-01-14',
        status: BeersStatusEnum.Fermenting,
        qty: {
            total: 2000
        }
    },
    {
        id: '3',
        style: BeersStylesEnum.Stout,
        brewedOn: '2020-01-01',
        availableOn: '2020-01-14',
        status: BeersStatusEnum.Conditioning,
        qty: {
            total: 1000
        }
    },
];