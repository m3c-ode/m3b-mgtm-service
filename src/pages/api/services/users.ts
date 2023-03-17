import axios from 'axios';
import { ObjectId } from "mongodb";
import { UserData, CreateUserInput } from '../../../types/users';

export const createUser = (userData: CreateUserInput | CreateUserInput[]) => axios.post('/api/users', userData);

export const deleteUser = (userId: string) => axios.delete(`/api/users/${userId}`);

export const fetchAllUsers = () => axios.get('/api/users');

export const updateUserInfo = (userId: string, userData: UserData) => axios.patch(`/api/users/${userId}`, { ...userData });