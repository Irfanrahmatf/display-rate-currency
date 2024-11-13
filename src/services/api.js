const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.currencyfreaks.com/v2.0/rates';

export const fetchExchangeRates = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/latest?apikey=${API_KEY}&symbols=CAD,EUR,IDR,JPY,CHF,GBP,SGD`
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};
