import axios from 'axios';

// axios.defaults.baseURL = process.env.MONGODB_URL
axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ?
        "http://localhost:3000"
        : `https://${process.env.VERCEL_URL}`;

console.log("🚀 ~ file: index.ts:5 ~ axios.defaults.baseURL", axios.defaults.baseURL);

console.log('env varibale tests');

export { createBeer, getAllBeers, updateBeerData, deleteBeer } from './beers';