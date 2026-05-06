import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: '' });
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const cargar = () => api.get('/categorias').then(res => setCategorias(res.data));
  useEffect(() => { cargar(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.nombre.trim()) {
      setError('El nombre de la categoría es obligatorio');
      return;
    }

    try {
      if (editando) {
        await api.put(`/categorias/${editando}`, form);
      } else {
        await api.post('/categorias', form);
      }
      setForm({ nombre: '' });
      setEditando(null);
      setMostrarForm(false);
      cargar();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Ya existe una categoría con ese nombre');
      } else {
        setError('Error al guardar la categoría');
      }
    }
  };

  const editar = (cat) => {
    setForm({ nombre: cat.nombre });
    setEditando(cat.idCategoria);
    setMostrarForm(true);
    setError('');
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      try {
        await api.delete(`/categorias/${id}`);
        cargar();
      } catch (err) {
        alert('No se puede eliminar esta categoría porque tiene eventos asociados.');
      }
    }
  };

  const categoriasFiltradas = categorias.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const inputStyle = {
    padding: '12px 14px', background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
    color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      paddingTop: '80px', paddingBottom: '40px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '700', margin: 0 }}>Categorías</h1>
          <button onClick={() => { setForm({ nombre: '' }); setEditando(null); setMostrarForm(!mostrarForm); setError(''); }}
            style={{
              padding: '10px 20px', background: 'white', color: '#0f0f0f',
              border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer'
            }}>
            {mostrarForm ? 'Cancelar' : '+ Nueva Categoría'}
          </button>
        </div>

        {/* Barra de búsqueda */}
        <input
          placeholder="🔍 Buscar categoría..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ ...inputStyle, display: 'block', width: '100%', marginBottom: '24px' }}
        />

        {/* Formulario */}
        {mostrarForm && (
          <div style={{
            background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px',
            padding: '28px', marginBottom: '32px'
          }}>
            <h3 style={{ color: 'white', marginBottom: '16px', marginTop: 0 }}>
              {editando ? 'Editar Categoría' : 'Nueva Categoría'}
            </h3>

            {error && (
              <div style={{
                background: 'rgba(255,59,48,0.15)', border: '1px solid rgba(255,59,48,0.4)',
                borderRadius: '10px', padding: '10px 14px', color: '#ff6b6b',
                marginBottom: '16px', fontSize: '14px'
              }}>{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
              <input
                value={form.nombre}
                onChange={e => setForm({ nombre: e.target.value })}
                placeholder="Nombre de categoría *"
                style={{ ...inputStyle, flex: 1 }}
              />
              <button type="submit" style={{
                padding: '12px 24px', background: 'white', color: '#0f0f0f',
                border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer'
              }}>
                {editando ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        )}

        {/* Lista */}
        {categoriasFiltradas.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '48px', fontSize: '15px' }}>
            No se encontraron categorías
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categoriasFiltradas.map(cat => (
              <div key={cat.idCategoria} style={{
                background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px',
                padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ color: 'white', fontSize: '16px' }}>{cat.nombre}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => editar(cat)} style={{
                    padding: '8px 16px', background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
                    color: 'white', cursor: 'pointer', fontSize: '13px'
                  }}>Editar</button>
                  <button onClick={() => eliminar(cat.idCategoria)} style={{
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

export default AdminCategorias;