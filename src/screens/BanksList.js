import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getBanks } from '../api';
import '../styles/BanksList.css';
import defaultLogo from '../assets/default-image.png';
import Loader from '../components/Loader'; // Importamos el componente Loader

function BanksList() {
  const isMounted = useRef(true);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMounted.current) return;

        const cachedBanks = JSON.parse(localStorage.getItem('cachedBanks')) || [];

        if (cachedBanks.length > 0 && !fetchCompleted) {
          setBanks(cachedBanks);
          setLoading(false);
        } else {
          const data = await getBanks();
          if (!isMounted.current) return;

          setBanks(data);
          setFetchCompleted(true);
          setLoading(false);

          if (JSON.stringify(data) !== JSON.stringify(cachedBanks)) {
            localStorage.setItem('cachedBanks', JSON.stringify(data));
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
  }, [fetchCompleted]);

  return (
    <div className="bankslist-container">
      <div className="background-overlay"></div>
      <Header title="Lista de bancos" />
      <div className="bankslist-content">
        {loading ? (
          <Loader />
        ) : (
          banks.map((bank, index) => (
            <Link to={`/accounts/${bank.id}`} key={index} className="bank-card-link">
              <div className="bank-card">
                <img 
                  src={bank.text_logo || defaultLogo} 
                  alt={`${bank.display_name} logo`} 
                  className={`bank-img ${!bank.text_logo ? 'default-img' : ''}`} 
                />
                <h2 className="bank-name">{bank.display_name}</h2>
                <p className="bank-type">Tipo: {bank.type}</p>
                <p className="bank-country">País: {bank.country_code}</p>
              </div>
            </Link>
          ))
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default BanksList;