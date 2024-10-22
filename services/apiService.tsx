import axios from 'axios';

const API_URL = 'http://192.168.100.201:5000/api';
export interface LoginResponse {
    token: string;
    user:any;
  }
export const AuthService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  },
};

export interface LoginResponse {
    token: string; // Define the structure of the response
  }
export const ExpenseService = {
  addExpense: async (expense: { amount: number; category: string; userId: number }): Promise<any> => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/expenses`, expense, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateExpense: async (expenseId: string, expense: { amount: number; category: string }): Promise<any> => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/expenses/${expenseId}`, expense, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  deleteExpense: async (expenseId: string): Promise<any> => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/expenses/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getExpenses: async (): Promise<any[]> => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
