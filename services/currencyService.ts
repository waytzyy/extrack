import axios from 'axios';

const API_URL = 'https://v6.exchangerate-api.com/v6/d4255bec129b9e860289ce1f/latest/USD';

export const CurrencyService = {
  getExchangeRates: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data.rates;
    } catch (error) {
      console.error('Currency API Error:', error);
      throw error;
    }
  },
};
