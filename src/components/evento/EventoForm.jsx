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
      if (eventoEditar) {
        await api.put(`/eventos/${eventoEditar.idEvento}`, form);