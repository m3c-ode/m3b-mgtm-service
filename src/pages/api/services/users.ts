import axios from 'axios';
import { ObjectId } from "mongodb";
import { UserData, CreateUserInput } from '../../../types/users';

export const createUser = (userData: CreateUserInput | CreateUserInput[]) => axios.post('/api/users', userData);

export const deleteUser = (userId: string) => axios.delete(`/api/users/${userId}`);

export const fetchUsersList = () => axios.get('/api/users');

export const fetchUserInfo = (id: string) => axios.get(`/api/users/${id}`);

export const updateUserInfo = (userId: string, userData: UserData) => axios.patch(`/api/users/${userId}`, { ...userData });