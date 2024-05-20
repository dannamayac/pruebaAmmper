// src/components/Loader.js
import React from 'react';
import '../styles/Loader.css';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;