import axios from 'axios';
import { ObjectId } from "mongodb";
import { ClientData, NewClientInput } from '../../../types/clients';

export const createClient = (clientData: NewClientInput | NewClientInput[]) => axios.post('/api/clients', clientData);

export const deleteClient = (clientId: string) => axios.delete(`/api/clients/${clientId}`);

export const fetchAllClients = () => axios.get('/api/clients');

export const updateClientInfo = (clientId: string, clientData: ClientData) => axios.patch(`/api/clients/${clientId}`, { ...clientData });