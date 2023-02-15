import axios from 'axios';
import { BeerData } from '../../../types/beers';

export const createBeer = (beerData: BeerData | BeerData[]) => axios.post('/beers/post', beerData);