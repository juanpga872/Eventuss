import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px 20px', background: '#333', display: 'flex', gap: '20px' }}>
      <Link to="/eventos" style={{ color: 'white' }}>Eventos</Link>
      <Link to="/categorias" style={{ color: 'white' }}>Categorías</Link>
      <Link to="/usuarios" style={{ color: 'white' }}>Usuarios</Link>
    </nav>
  );
}

export default Navbar;