import axios from 'axios';

// axios.defaults.baseURL = process.env.MONGODB_URL
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ?
        "http://localhost:3000"
        // : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        : process.env.PROD_URL;

console.log("🚀 ~ file: index.ts:10 ~ process.env.NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);
console.log("🚀 ~ file: index.ts:7 ~ process.env.NODE_ENV", process.env.NODE_ENV);
console.log("🚀 ~ file: index.ts:5 ~ axios.defaults.baseURL", axios.defaults.baseURL);
console.log("🚀 ~ file: index.ts:10 ~ process.env.PROD_URL", process.env.PROD_URL);



console.log('env varibale tests');
// console.log('other test', NEXT_PUBLIC_VERCEL_URL);

export { createBeer, getAllBeers, updateBeerData, deleteBeer } from './beers';