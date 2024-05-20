import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { createLink, fetchAccounts, getAccounts, getBankDetails } from '../api';
import '../styles/Accounts.css';
import Loader from '../components/Loader';

function Accounts() {
  const { bankId } = useParams();
  const isMounted = useRef(true);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMounted.current) return;

        const cachedAccounts = JSON.parse(localStorage.getItem(`cachedAccounts_${bankId}`)) || [];

        if (cachedAccounts.length > 0) {
          setAccounts(cachedAccounts);
          setLoading(false);
        } else {
          const bankDetails = await getBankDetails(bankId);

          const linkResponseId = await createLink(bankDetails.name, bankDetails.id, 'full', bankDetails.resources);

          const fetchedAccountsData = await fetchAccounts(linkResponseId);

          if (fetchedAccountsData.length > 0) {
            const link = fetchedAccountsData[0].link;
            const data = await getAccounts(link);

            if (!isMounted.current) return;

            setAccounts(data);
            setLoading(false);

            localStorage.setItem(`cachedAccounts_${bankId}`, JSON.stringify(data));
          } else {
            throw new Error('No accounts found');
          }
        }
      } catch (error) {
        if (isMounted.current) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [bankId]);

  return (
    <div className="accounts-container">
      <div className="background-overlay"></div>
      <Header title="Lista de cuentas" />
      <div className="accounts-content">
        {loading ? (
          <Loader />
        ) : (
          accounts.map((account, index) => (
            <Link to={`/transactions/${account.id}`} key={index} className="account-card-link">
              <div className="account-card">
                <h2 className="account-name">{account.name}</h2>
                <p className="account-type">Tipo: {account.type}</p>
                <p className="account-number">Número: {account.number}</p>
              </div>
            </Link>
          ))
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Accounts;