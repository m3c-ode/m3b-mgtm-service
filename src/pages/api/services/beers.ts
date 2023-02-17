import axios from 'axios';
import { ObjectId } from "mongodb";
import type { BeerData, NewBeerData } from '../../../types/beers';

export const createBeer = (beerData: NewBeerData | NewBeerData[]) => axios.post('/api/beers', beerData);

export const getAllBeers = () => axios.get<BeerData[]>('/api/beers');

export const updateBeerData = (beerID: string | ObjectId, beerData: BeerData) => axios.patch(`/api/beers/${beerID}`, { ...beerData });

export const deleteBeer = (beerID: string | ObjectId) => axios.delete(`/api/beers/${beerID}`);