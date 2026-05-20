import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const VACIO = { nombre: '', descripcion: '', fecha: '', ubicacion: '', imagenUrl: '', categoria: { idCategoria: '' } };

function AdminEventos() {
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(VACIO);
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const cargar = () => {
    api.get('/eventos').then(res => setEventos(res.data));
    api.get('/categorias').then(res => setCategorias(res.data));
  };

  useEffect(() => { cargar(); }, []);

  const handleChange = e => {
    if (e.target.name === 'categoria') {
      setForm({ ...form, categoria: { idCategoria: e.target.value } });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.nombre || !form.fecha || !form.ubicacion || !form.descripcion) {
      setError('Debes completar todos los campos obligatorios');
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaEvento = new Date(form.fecha + 'T00:00:00');
    if (fechaEvento < hoy) {
      setError('La fecha del evento no puede ser anterior a hoy');
      return;
    }

    try {
      if (editando) {
        await api.put(`/eventos/${editando}`, form);
      } else {
        await api.post('/eventos', form);
      }
      setForm(VACIO);
      setEditando(null);
      setMostrarForm(false);
      setError('');
      cargar();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Ya existe un evento con ese nombre y fecha');
      } else if (err.response?.status === 400) {
        setError('Completa todos los campos obligatorios');
      } else {
        setError('Error al guardar el evento');
      }
    }
  };

  const editar = (evento) => {
    setForm({
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      fecha: evento.fecha,
      ubicacion: evento.ubicacion,
      imagenUrl: evento.imagenUrl || '',
      categoria: { idCategoria: evento.categoria?.idCategoria || '' }
    });
    setEditando(evento.idEvento);
    setMostrarForm(true);
    setError('');
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar este evento?')) {
      try {
        await api.delete(`/eventos/${id}`);
        cargar();
      } catch (err) {
        alert('No se puede eliminar este evento.');
      }
    }
  };

  const eventosFiltrados = eventos.filter(e => {
    const coincideNombre = e.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaFiltro === '' || e.categoria?.idCategoria?.toString() === categoriaFiltro;
    return coincideNombre && coincideCategoria;
  });

  const inputStyle = {
    display: 'block', width: '100%', padding: '12px 14px', marginBottom: '12px',
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      paddingTop: '80px', paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '700', margin: 0 }}>Gestión de Eventos</h1>
          <button onClick={() => { setForm(VACIO); setEditando(null); setMostrarForm(!mostrarForm); setError(''); }}
            style={{
              padding: '10px 20px', background: 'white', color: '#0f0f0f',
              border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer'
            }}>
            {mostrarForm ? 'Cancelar' : '+ Nuevo Evento'}
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <input
            placeholder="🔍 Buscar por nombre..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{ ...inputStyle, flex: 1, minWidth: '200px', marginBottom: 0 }}
          />
          <select
            value={categoriaFiltro}
            onChange={e => setCategoriaFiltro(e.target.value)}
            style={{ ...inputStyle, flex: 1, minWidth: '160px', marginBottom: 0, cursor: 'pointer' }}
          >
            <option value="">Todas las categorías</option>
            {categorias.map(c => (
              <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
            ))}
          </select>
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div style={{
            background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px',
            padding: '28px', marginBottom: '32px'
          }}>
            <h3 style={{ color: 'white', marginBottom: '20px', marginTop: 0 }}>
              {editando ? 'Editar Evento' : 'Nuevo Evento'}
            </h3>

            {error && (
              <div style={{
                background: 'rgba(255,59,48,0.15)', border: '1px solid rgba(255,59,48,0.4)',
                borderRadius: '10px', padding: '10px 14px', color: '#ff6b6b',
                marginBottom: '16px', fontSize: '14px'
              }}>{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <input name="nombre" placeholder="Nombre del evento *" value={form.nombre} onChange={handleChange} style={inputStyle} />
              <textarea name="descripcion" placeholder="Descripción *" value={form.descripcion} onChange={handleChange}
                style={{ ...inputStyle, height: '80px', resize: 'vertical' }} />
              <input name="fecha" type="date" value={form.fecha} onChange={handleChange} style={inputStyle} />
              <input name="ubicacion" placeholder="Ubicación *" value={form.ubicacion} onChange={handleChange} style={inputStyle} />
              <input name="imagenUrl" placeholder="URL de imagen (opcional)" value={form.imagenUrl} onChange={handleChange} style={inputStyle} />
              <select name="categoria" value={form.categoria.idCategoria} onChange={handleChange} style={inputStyle}>
                <option value="">Sin categoría</option>
                {categorias.map(c => <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>)}
              </select>
              <button type="submit" style={{
                width: '100%', padding: '12px', background: 'white', color: '#0f0f0f',
                border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer'
              }}>
                {editando ? 'Actualizar' : 'Crear Evento'}
              </button>
            </form>
          </div>
        )}

        {/* Lista de eventos */}
        {eventosFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '48px', fontSize: '15px' }}>
            No se encontraron eventos
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {eventosFiltrados.map(evento => (
              <div key={evento.idEvento} style={{
                background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px',
                padding: '20px', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap', gap: '12px'
              }}>
                <div>
                  <h3 style={{ color: 'white', margin: '0 0 4px', fontSize: '16px' }}>{evento.nombre}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0, fontSize: '13px' }}>
                    📅 {evento.fecha} · 📍 {evento.ubicacion} · {evento.categoria?.nombre || 'Sin categoría'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => editar(evento)} style={{
                    padding: '8px 16px', background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
                    color: 'white', cursor: 'pointer', fontSize: '13px'
                  }}>Editar</button>
                  <button onClick={() => eliminar(evento.idEvento)} style={{
                    padding: '8px 16px', background: 'rgba(255,59,48,0.2)',
                    border: '1px solid rgba(255,59,48,0.4)', borderRadius: '8px',
                    color: '#ff6b6b', cursor: 'pointer', fontSize: '13px'
                  }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEventos;