import axios from 'axios';

// axios.defaults.baseURL = process.env.MONGODB_URL
axios.defaults.baseURL = "http://localhost:3000/api";

export { createBeer, getAllBeers, updateBeerData } from './beers';