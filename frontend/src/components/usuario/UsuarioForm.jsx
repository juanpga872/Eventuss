import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const VACIO = { nombre: '', email: '', password: '' };

function UsuarioForm({ usuarioEditar, onGuardado }) {
  const [form, setForm] = useState(VACIO);

  useEffect(() => {
    setForm(usuarioEditar || VACIO);
  }, [usuarioEditar]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const peticion = usuarioEditar
      ? api.put(`/usuarios/${usuarioEditar.idUsuario}`, form)
      : api.post('/usuarios', form);
    peticion.then(onGuardado);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <button type="submit">{usuarioEditar ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
}

export default UsuarioForm;