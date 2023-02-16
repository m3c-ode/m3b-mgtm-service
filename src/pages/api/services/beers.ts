import axios from 'axios';
import { ObjectId } from "mongodb";
import type { BeerData, NewBeerData } from '../../../types/beers';

export const createBeer = (beerData: NewBeerData | NewBeerData[]) => axios.post('/beers', beerData);

export const getAllBeers = () => axios.get('/beers');

export const updateBeerData = (beerID: string | ObjectId, beerData: BeerData) => axios.patch(`/beers/${beerID}`, { ...beerData });
