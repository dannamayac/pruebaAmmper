// src/screens/Transactions.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getTransactions, getAccountDetails } from '../api';
import '../styles/Transactions.css';
import Loader from '../components/Loader';

function Transactions() {
  const { accountId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountData = await getAccountDetails(accountId);
        setAccountDetails(accountData);

        const transactionsData = await getTransactions(accountData.link);
        setTransactions(transactionsData);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [accountId]);

  const ingresos = transactions.filter(tx => tx.type === 'INFLOW').reduce((acc, tx) => acc + tx.amount, 0);
  const egresos = transactions.filter(tx => tx.type === 'OUTFLOW').reduce((acc, tx) => acc + tx.amount, 0);
  const balance = ingresos - egresos;

  return (
    <div className="transactions-container">
      <div className="background-overlay"></div>
      <Header title="Lista de transacciones" />
      <div className="transactions-kpi-container">
        <h2 className={`transactions-kpi ${balance >= 0 ? 'positive' : 'negative'}`}>Balance: {balance}</h2>
      </div>
      <div className="transactions-content">
        {loading ? (
          <Loader />
        ) : (
          transactions.map((transaction, index) => (
            <div key={index} className="transaction-card">
              <h2 className="transaction-name">{transaction.description}</h2>
              <p className="transaction-amount">{transaction.amount}</p>
              <p className="transaction-type">{transaction.type}</p>
            </div>
          ))
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Transactions;