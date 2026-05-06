import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';

function EventosPage() {
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [inscripciones, setInscripciones] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    api.get('/eventos').then(res => setEventos(res.data));
    api.get('/categorias').then(res => setCategorias(res.data));
    const idUsuario = localStorage.getItem('id');
    api.get(`/inscripciones/usuario/${idUsuario}`)
      .then(res => setInscripciones(res.data.map(i => i.evento.idEvento)));
  }, [auth.id]);

  const inscribirse = async (idEvento) => {
    try {
      await api.post('/inscripciones', { idUsuario: parseInt(auth.id), idEvento });
      setInscripciones([...inscripciones, idEvento]);
    } catch (err) {
      alert('Ya estás inscrito en este evento');
    }
  };

  const eventosFiltrados = eventos.filter(e => {
    const coincideNombre = e.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria === '' || e.categoria?.idCategoria === parseInt(filtroCategoria);
    return coincideNombre && coincideCategoria;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      paddingTop: '80px', paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
          Eventos
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
          Descubre y únete a eventos culturales y conciertos
        </p>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <input
            placeholder="Buscar evento..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{
              flex: 1, minWidth: '200px', padding: '12px 16px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px', color: 'white', fontSize: '14px', outline: 'none'
            }}
          />
          <select
            value={filtroCategoria}
            onChange={e => setFiltroCategoria(e.target.value)}
            style={{
              padding: '12px 16px', background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px', color: 'white', fontSize: '14px', outline: 'none'
            }}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(c => (
              <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
            ))}
          </select>
        </div>

        {/* Cards de eventos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {eventosFiltrados.map(evento => (
            <div key={evento.idEvento} style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '20px', overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {evento.imagenUrl && (
                <img src={evento.imagenUrl} alt={evento.nombre}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              )}
              {!evento.imagenUrl && (
                <div style={{
                  width: '100%', height: '180px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '48px'
                }}>🎵</div>
              )}
              <div style={{ padding: '20px' }}>
                <span style={{
                  background: 'rgba(255,255,255,0.15)', borderRadius: '6px',
                  padding: '3px 10px', fontSize: '12px', color: 'rgba(255,255,255,0.7)'
                }}>
                  {evento.categoria?.nombre || 'Sin categoría'}
                </span>
                <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: '10px 0 6px' }}>
                  {evento.nombre}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '6px' }}>
                  📅 {evento.fecha}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '16px' }}>
                  📍 {evento.ubicacion}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setEventoSeleccionado(evento)}
                    style={{
                      flex: 1, padding: '10px',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '10px', color: 'white',
                      fontSize: '13px', cursor: 'pointer'
                    }}>
                    Ver detalles
                  </button>
                  <button
                    onClick={() => inscribirse(evento.idEvento)}
                    disabled={inscripciones.includes(evento.idEvento)}
                    style={{
                      flex: 1, padding: '10px',
                      background: inscripciones.includes(evento.idEvento)
                        ? 'rgba(255,255,255,0.1)' : 'white',
                      border: 'none', borderRadius: '10px',
                      color: inscripciones.includes(evento.idEvento) ? 'rgba(255,255,255,0.4)' : '#0f0f0f',
                      fontSize: '13px', fontWeight: '600',
                      cursor: inscripciones.includes(evento.idEvento) ? 'not-allowed' : 'pointer'
                    }}>
                    {inscripciones.includes(evento.idEvento) ? '✓ Inscrito' : 'Inscribirse'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {eventosFiltrados.length === 0 && (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginTop: '60px' }}>
            <p style={{ fontSize: '48px' }}>🔍</p>
            <p>No se encontraron eventos</p>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {eventoSeleccionado && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, padding: '20px'
        }} onClick={() => setEventoSeleccionado(null)}>
          <div style={{
            background: 'rgba(30,30,50,0.95)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '24px', padding: '32px',
            maxWidth: '500px', width: '100%'
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
              {eventoSeleccionado.nombre}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>
              {eventoSeleccionado.descripcion}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '8px' }}>
              📅 {eventoSeleccionado.fecha}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '24px' }}>
              📍 {eventoSeleccionado.ubicacion}
            </p>
            <button
              onClick={() => setEventoSeleccionado(null)}
              style={{
                width: '100%', padding: '12px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px', color: 'white',
                fontSize: '15px', cursor: 'pointer'
              }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventosPage;