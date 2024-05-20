// src/components/Modal.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegisterModal.css';

function RegisterModal({ show, onClose }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registo Exitoso!</h2>
        <p>Su cuenta ha sido creada con éxito.</p>
        <Link to="/" className="modal-button" onClick={onClose}>
          Ir a iniciar sesión
        </Link>
      </div>
    </div>
  );
}

export default RegisterModal;