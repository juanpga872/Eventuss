import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const inputStyle = {
  display: 'block', width: '100%', padding: '14px 16px',
  marginBottom: '12px', background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px',
  color: 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box'
};

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      login(res.data);
      if (res.data.role === 'ADMIN') {
        navigate('/admin/eventos');
      } else {
        navigate('/eventos');
      }
    } catch (err) {
      setError('Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '24px', padding: '48px 40px',
        width: '100%', maxWidth: '400px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
      }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
          Eventuss
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '32px', fontSize: '15px' }}>
          Inicia sesión para continuar
        </p>

        {error && (
          <div style={{
            background: 'rgba(255,59,48,0.15)', border: '1px solid rgba(255,59,48,0.4)',
            borderRadius: '12px', padding: '12px 16px', color: '#ff6b6b',
            marginBottom: '20px', fontSize: '14px'
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email"
            value={form.email} onChange={handleChange} required style={inputStyle} />
          <input name="password" type="password" placeholder="Contraseña"
            value={form.password} onChange={handleChange} required
            style={{ ...inputStyle, marginBottom: '24px' }} />
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? 'rgba(255,255,255,0.2)' : 'white',
            color: '#0f0f0f', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}>
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{ color: 'white', fontWeight: '600' }}>Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;