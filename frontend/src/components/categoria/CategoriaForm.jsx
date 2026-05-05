import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const VACIO = { nombre: '' };

function CategoriaForm({ categoriaEditar, onGuardado }) {
  const [form, setForm] = useState(VACIO);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(categoriaEditar || VACIO);
    setError('');
  }, [categoriaEditar]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.nombre.trim()) {
      setError('El nombre de la categoría es obligatorio');
      return;
    }

    try {
      if (categoriaEditar) {
        await api.put(`/categorias/${categoriaEditar.idCategoria}`, form);
      } else {
        await api.post('/categorias', form);
      }
      setForm(VACIO);
      onGuardado();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Ya existe una categoría con ese nombre');
      } else {
        setError('Error al guardar la categoría');
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
      <input name="nombre" placeholder="Nombre categoría *" value={form.nombre} onChange={handleChange} style={inputStyle} />
      <button type="submit" style={{
        padding: '10px 24px', background: 'white', color: '#0f0f0f',
        border: 'none', borderRadius: '10px', fontSize: '14px',
        fontWeight: '600', cursor: 'pointer'
      }}>
        {categoriaEditar ? 'Actualizar' : 'Crear categoría'}
      </button>
      {categoriaEditar && (
        <button type="button" onClick={() => onGuardado()} style={{
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

export default CategoriaForm;