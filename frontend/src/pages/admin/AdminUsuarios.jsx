import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/usuarios').then(res => setUsuarios(res.data));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      paddingTop: '80px', paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '700', marginBottom: '32px' }}>Usuarios</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {usuarios.map(u => (
            <div key={u.idUsuario} style={{
              background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px',
              padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: '700', fontSize: '18px'
                }}>
                  {u.nombre?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ color: 'white', margin: '0 0 4px', fontWeight: '600' }}>{u.nombre}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '13px' }}>{u.email}</p>
                </div>
              </div>
              <span style={{
                background: u.rol?.nombre === 'ADMIN' ? 'rgba(255,200,0,0.2)' : 'rgba(100,200,100,0.2)',
                border: `1px solid ${u.rol?.nombre === 'ADMIN' ? 'rgba(255,200,0,0.4)' : 'rgba(100,200,100,0.4)'}`,
                borderRadius: '8px', padding: '4px 12px', fontSize: '12px',
                color: u.rol?.nombre === 'ADMIN' ? '#ffd700' : '#90ee90'
              }}>
                {u.rol?.nombre || 'USER'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;