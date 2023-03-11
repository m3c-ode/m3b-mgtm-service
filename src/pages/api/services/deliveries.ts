import axios from 'axios';
import { ObjectId } from "mongodb";
import { DeliveryData, NewDeliveryInput } from '../../../types/deliveries';

export const createDelivery = (deliveryData: NewDeliveryInput | NewDeliveryInput[]) => axios.post('/api/deliveries', deliveryData);

export const deleteDelivery = (deliveryId: string) => axios.delete(`/api/deliveries/${deliveryId}`);

export const fetchAllDeliveries = () => axios.get('/api/deliveries');

export const updateDeliveryInfo = (deliveryId: string, deliveryData: Partial<DeliveryData>) => axios.patch(`/api/deliveries/${deliveryId}`, { ...deliveryData });