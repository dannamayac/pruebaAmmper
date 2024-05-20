// Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api';
import RegisterModal from '../components/RegisterModal';
import '../styles/Register.css';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await register(name, email, password);
      if (data) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      setError('Error en el registro. Por favor, verifica los datos ingresados.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="register-container">
      <div className="background-overlay"></div>
      <div className="content">
        <h1 className="title">Registro</h1>
        {error && <p className="error">{error}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuario:</label>
            <input 
              type="text" 
              name="username" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Correo electrónico:</label>
            <input 
              type="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input 
              type="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <div className="login-link">
          <p>¿Ya tienes una cuenta? <Link to="/">Inicia aquí</Link></p>
        </div>
      </div>
      <RegisterModal show={showModal} onClose={handleCloseModal} />
    </div>
  );
}

export default Register;