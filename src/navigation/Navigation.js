import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../screens/Login';
import Register from '../screens/Register';
import BanksList from '../screens/BanksList';
import Transactions from '../screens/Transactions';
import Accounts from '../screens/Accounts';

function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/banks" element={<BanksList />} />
        <Route path="/accounts/:bankId" element={<Accounts />} />
        <Route path="/transactions/:accountId" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default Navigation;