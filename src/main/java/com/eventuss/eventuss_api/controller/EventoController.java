package com.eventuss.eventuss_api.controller;

import com.eventuss.eventuss_api.model.Evento;
import com.eventuss.eventuss_api.service.EventoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/eventos")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping
    public List<Evento> listarEventos(){
        return eventoService.obtenerEventos();
    }

    @GetMapping("/{id}")
    public Optional<Evento> obtenerEvento(@PathVariable Integer id){
        return eventoService.obtenerEventoPorId(id);
    }

    @PostMapping
    public Evento crearEvento(@RequestBody Evento evento){
        return eventoService.guardarEvento(evento);
    }

    @PutMapping("/{id}")
    public Evento actualizarEvento(@PathVariable Integer id, @RequestBody Evento evento){
        evento.setIdEvento(id);
        return eventoService.guardarEvento(evento);
    }

    @DeleteMapping("/{id}")
    public void eliminarEvento(@PathVariable Integer id){
        eventoService.eliminarEvento(id);
    }
}