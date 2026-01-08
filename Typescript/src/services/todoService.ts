import axios from 'axios';
import {Todo} from '../types/todo';
import { TodoComment } from 'typescript';

const API_BASE_URL = '/api/todo';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const todoService = {
    async getAll(): Promise<Todo[]> {
        const response = await fetch(API_BASE_URL); // fetch関数... 
        if(!response.ok) {
            throw new Error('Todoの取得に失敗しました');
        }
        return  response.json();
    },

    async create(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
     const response = await apiClient.post<Todo>('', todo);
     return response.data;
    },

    async update(id: number, todo: Todo): Promise<Todo> {
     const response = await apiClient.put<Todo>(`/${id}`, todo);
     return response.data;
    },
    
    async delete(id: number): Promise<void> {
     const response = await apiClient.delete(`/${id}`);
    },
};
