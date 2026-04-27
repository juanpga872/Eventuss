import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import CategoriaForm from './CategoriaForm';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditar, setCategoriaEditar] = useState(null);

  const cargarCategorias = () => {
    api.get('/categorias').then(res => setCategorias(res.data));
  };

  useEffect(() => { cargarCategorias(); }, []);

  const eliminar = (id) => {
    api.delete(`/categorias/${id}`).then(cargarCategorias);
  };

  return (
    <div>
      <h2>Categorías</h2>
      <CategoriaForm categoriaEditar={categoriaEditar} onGuardado={() => {
        setCategoriaEditar(null);
        cargarCategorias();
      }} />
      <ul>
        {categorias.map(c => (
          <li key={c.idCategoria}>
            <strong>{c.nombre}</strong>
            <button onClick={() => setCategoriaEditar(c)}>Editar</button>
            <button onClick={() => eliminar(c.idCategoria)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriaList;