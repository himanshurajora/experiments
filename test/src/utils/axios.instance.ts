import axios from 'axios'
import { User } from '../types/common.type';
export const instance = axios.create({
    baseURL: 'https://api.github.com'
})

export async function getUsers(): Promise<User[]> {
    const response = await instance.get('/users');
    return response.data;
}
