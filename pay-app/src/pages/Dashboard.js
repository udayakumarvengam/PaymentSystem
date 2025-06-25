import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [summary, setSummary] = useState({ accounts: 0, recent: [] });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const accountsRes = await API.get('/accounts');
      const paymentsRes = await API.get('/payments?limit=5');
      setSummary({ accounts: accountsRes.data.total, recent: paymentsRes.data.data });
    })();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Total Accounts: {summary.accounts}</p>
      <h3>Recent Payments</h3>
      <ul>
        {summary.recent.map(p => (
          <li key={p.id}>
            ${p.amount} – {new Date(p.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/payment")}>
        Go to Payment Section
      </button>
      <button onClick={() => navigate("/accounts")}>
        Go to Account Section
      </button>
    </div>
  );
}
