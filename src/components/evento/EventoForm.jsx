import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const VACIO = { nombre: '', descripcion: '', fecha: '', ubicacion: '', imagenUrl: '' };

function EventoForm({ eventoEditar, onGuardado }) {
  const [form, setForm] = useState(VACIO);

  useEffect(() => {
    setForm(eventoEditar || VACIO);
  }, [eventoEditar]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const peticion = eventoEditar
      ? api.put(`/eventos/${eventoEditar.idEvento}`, form)
      : api.post('/eventos', form);
    peticion.then(onGuardado);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
      <input name="ubicacion" placeholder="Ubicación" value={form.ubicacion} onChange={handleChange} />
      <button type="submit">{eventoEditar ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
}

export default EventoForm;