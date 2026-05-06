import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import UsuarioForm from './UsuarioForm';

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const cargarUsuarios = () => {
    api.get('/usuarios').then(res => setUsuarios(res.data));
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const eliminar = (id) => {
    api.delete(`/usuarios/${id}`).then(cargarUsuarios);
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <UsuarioForm usuarioEditar={usuarioEditar} onGuardado={() => {
        setUsuarioEditar(null);
        cargarUsuarios();
      }} />
      <ul>
        {usuarios.map(u => (
          <li key={u.idUsuario}>
            <strong>{u.nombre}</strong> — {u.email}
            <button onClick={() => setUsuarioEditar(u)}>Editar</button>
            <button onClick={() => eliminar(u.idUsuario)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioList;