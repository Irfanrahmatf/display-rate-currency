import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchExchangeRates } from './services/api';

const App = () => {
  const [rates, setRates] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const currencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP', 'SGD'];

  // Fetch Data
  React.useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await fetchExchangeRates();
        if (data && data.rates) {
          setRates(data.rates);
        } else {
          setError("No exchange rates data available");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setError("Failed to fetch exchange rates");
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  // hitung Nilai Tukar
  const calculateBuyRate = (rate) => (parseFloat(rate) * 1.05).toFixed(4);
  const calculateSellRate = (rate) => (parseFloat(rate) * 0.95).toFixed(4);

  // Status Loading dan Error
  if (loading) {
    return (
      <div className="exchange-status-message exchange-loading">
        <p>Loading exchange rates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exchange-status-message exchange-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="exchange-wrapper">
      <div className="exchange-card">
        <div className="exchange-content">
          <div className="exchange-table-wrapper">
            <table className="exchange-table">
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>We Buy</th>
                  <th>Exchange Rate</th>
                  <th>We Sell</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(rates).length === 0 ? (
                  <tr>
                    <td colSpan="4" className="exchange-no-data">No data available</td>
                  </tr>
                ) : (
                  currencies.map((currency) => (
                    <tr key={currency}>
                      <td>{currency}</td>
                      <td>
                        {rates[currency] ? calculateBuyRate(rates[currency]) : '-'}
                      </td>
                      <td>
                        {rates[currency] ? parseFloat(rates[currency]).toFixed(4) : '-'}
                      </td>
                      <td>
                        {rates[currency] ? calculateSellRate(rates[currency]) : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;