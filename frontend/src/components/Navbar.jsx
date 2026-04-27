import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(15,15,15,0.7)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '0 32px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <Link to="/eventos" style={{
        color: 'white',
        textDecoration: 'none',
        fontSize: '20px',
        fontWeight: '700'
      }}>
        Eventuss
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {auth.role === 'ADMIN' && (
          <>
            <Link to="/admin/eventos" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
              Eventos
            </Link>
            <Link to="/admin/categorias" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
              Categorías
            </Link>
            <Link to="/admin/usuarios" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
              Usuarios
            </Link>
          </>
        )}
        {auth.role === 'USER' && (
          <Link to="/eventos" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
            Eventos
          </Link>
        )}

        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
          {auth.nombre}
        </span>

        <button onClick={handleLogout} style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          color: 'white',
          padding: '6px 16px',
          fontSize: '14px',
          cursor: 'pointer'
        }}>
          Salir
        </button>
      </div>
    </nav>
  );
}

export default Navbar;