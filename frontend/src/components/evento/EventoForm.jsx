import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const VACIO = { nombre: '', descripcion: '', fecha: '', ubicacion: '', imagenUrl: '', categoria: { idCategoria: '' } };

function EventoForm({ eventoEditar, onGuardado }) {
  const [form, setForm] = useState(VACIO);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/categorias').then(res => setCategorias(res.data));
  }, []);

  useEffect(() => {
    setForm(eventoEditar || VACIO);
    setError('');
  }, [eventoEditar]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Validar campos obligatorios
    if (!form.nombre || !form.fecha || !form.ubicacion || !form.descripcion) {
      setError('Debes completar todos los campos obligatorios');
      return;
    }

    try {
      if (eventoEditar) {
        await api.put(`/eventos/${eventoEditar.idEvento}`, form);
      } else {
        await api.post('/eventos', form);
      }
      setForm(VACIO);
      onGuardado();
    } catch (err) {
      const msg = err.response?.data;
      if (err.response?.status === 409) {
        setError('Ya existe un evento con ese nombre y fecha');
      } else if (err.response?.status === 400) {
        setError(msg || 'Completa todos los campos');
      } else {
        setError('Error al guardar el evento');
      }
    }
  };

  const inputStyle = {
    display: 'block', width: '100%', padding: '10px 14px',
    marginBottom: '10px', background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
    color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
      {error && (
        <div style={{
          background: 'rgba(255,59,48,0.15)', border: '1px solid rgba(255,59,48,0.4)',
          borderRadius: '10px', padding: '10px 14px', color: '#ff6b6b',
          marginBottom: '12px', fontSize: '14px'
        }}>{error}</div>
      )}
      <input name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange} style={inputStyle} />
      <input name="descripcion" placeholder="Descripción *" value={form.descripcion} onChange={handleChange} style={inputStyle} />
      <input name="fecha" type="date" value={form.fecha} onChange={handleChange} style={inputStyle} />
      <input name="ubicacion" placeholder="Ubicación *" value={form.ubicacion} onChange={handleChange} style={inputStyle} />
      <input name="imagenUrl" placeholder="URL de imagen (opcional)" value={form.imagenUrl} onChange={handleChange} style={inputStyle} />
      <select
        value={form.categoria?.idCategoria || ''}
        onChange={e => setForm({ ...form, categoria: { idCategoria: e.target.value } })}
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        <option value="">Sin categoría</option>
        {categorias.map(c => (
          <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
        ))}
      </select>
      <button type="submit" style={{
        padding: '10px 24px', background: 'white', color: '#0f0f0f',
        border: 'none', borderRadius: '10px', fontSize: '14px',
        fontWeight: '600', cursor: 'pointer'
      }}>
        {eventoEditar ? 'Actualizar' : 'Crear evento'}
      </button>
      {eventoEditar && (
        <button type="button" onClick={() => { onGuardado(); setForm(VACIO); }} style={{
          marginLeft: '10px', padding: '10px 24px',
          background: 'transparent', color: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px',
          fontSize: '14px', cursor: 'pointer'
        }}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default EventoForm;