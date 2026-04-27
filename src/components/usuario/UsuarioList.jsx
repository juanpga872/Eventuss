import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import EventoForm from './EventoForm';

function EventoList() {
  const [eventos, setEventos] = useState([]);
  const [eventoEditar, setEventoEditar] = useState(null);

  const cargarEventos = () => {
    api.get('/eventos').then(res => setEventos(res.data));
  };

  useEffect(() => { cargarEventos(); }, []);

  const eliminar = (id) => {
    api.delete(`/eventos/${id}`).then(cargarEventos);
  };

  return (
    <div>
      <h2>Eventos</h2>
      <EventoForm eventoEditar={eventoEditar} onGuardado={() => {
        setEventoEditar(null);
        cargarEventos();
      }} />
      <ul>
        {eventos.map(e => (
          <li key={e.idEvento}>
            <strong>{e.nombre}</strong> — {e.fecha}
            <button onClick={() => setEventoEditar(e)}>Editar</button>
            <button onClick={() => eliminar(e.idEvento)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioList;