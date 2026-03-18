package com.eventuss.eventuss_api.service;

import com.eventuss.eventuss_api.model.Evento;
import com.eventuss.eventuss_api.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    // Guardar evento
    public Evento guardarEvento(Evento evento){
        return eventoRepository.save(evento);
    }

    // Listar eventos
    public List<Evento> obtenerEventos(){
        return eventoRepository.findAll();
    }

    // Buscar evento por id
    public Optional<Evento> obtenerEventoPorId(Integer id){
        return eventoRepository.findById(id);
    }

    // Eliminar evento
    public void eliminarEvento(Integer id){
        eventoRepository.deleteById(id);
    }
}