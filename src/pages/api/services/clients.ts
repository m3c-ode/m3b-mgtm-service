import axios from 'axios';
import { ObjectId } from "mongodb";
import { NewClientInput } from '../../../types/clients';

export const createClient = (clientData: NewClientInput | NewClientInput[]) => axios.post('/api/clients', clientData);
