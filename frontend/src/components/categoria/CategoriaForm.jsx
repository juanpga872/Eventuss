import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const VACIO = { nombre: '' };

function CategoriaForm({ categoriaEditar, onGuardado }) {
  const [form, setForm] = useState(VACIO);

  useEffect(() => {
    setForm(categoriaEditar || VACIO);
  }, [categoriaEditar]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const peticion = categoriaEditar
      ? api.put(`/categorias/${categoriaEditar.idCategoria}`, form)
      : api.post('/categorias', form);
    peticion.then(onGuardado);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre categoría" value={form.nombre} onChange={handleChange} />
      <button type="submit">{categoriaEditar ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
}

export default CategoriaForm;