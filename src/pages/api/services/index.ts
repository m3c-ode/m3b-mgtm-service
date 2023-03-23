import axios from 'axios';

axios.defaults.baseURL =
    process.env.NODE_ENV === "development" ?
        "http://localhost:3000"
        : process.env.PROD_URL;

console.log('env varibale tests');

export { createBeer, getAllBeers, updateBeerData, deleteBeer } from './beers';
export {
    createClient, fetchAllClients, updateClientInfo, deleteClient
} from './clients';

export { createDelivery, fetchAllDeliveries, updateDeliveryInfo, deleteDelivery } from './deliveries';

export { createUser, fetchUserInfo, fetchUsersList, deleteUser, updateUserInfo } from './users';
