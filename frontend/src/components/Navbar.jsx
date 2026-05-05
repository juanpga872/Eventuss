import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const linkStyle = {
    color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px'
  };

  const menuItems = (
    <>
      {auth.role === 'ADMIN' && (
        <>
          <Link to="/admin/eventos" style={linkStyle} onClick={() => setMenuOpen(false)}>Eventos</Link>
          <Link to="/admin/categorias" style={linkStyle} onClick={() => setMenuOpen(false)}>Categorías</Link>
          <Link to="/admin/usuarios" style={linkStyle} onClick={() => setMenuOpen(false)}>Usuarios</Link>
        </>
      )}
      {auth.role === 'USER' && (
        <Link to="/eventos" style={linkStyle} onClick={() => setMenuOpen(false)}>Eventos</Link>
      )}
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>{auth.nombre}</span>
      <button onClick={handleLogout} style={{
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '8px', color: 'white', padding: '6px 16px',
        fontSize: '14px', cursor: 'pointer'
      }}>Salir</button>
    </>
  );

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(15,15,15,0.7)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '0 24px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        height: '60px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link to="/eventos" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', fontWeight: '700' }}>
          Eventuss
        </Link>

        {/* Desktop */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {menuItems}
        </div>

        {/* Hamburger mobile */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'white', fontSize: '24px', cursor: 'pointer'
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="nav-mobile" style={{
          display: 'flex', flexDirection: 'column', gap: '16px',
          padding: '16px 0 20px', borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {menuItems}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;