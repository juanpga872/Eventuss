package com.eventuss.eventuss_api.controller;

import com.eventuss.eventuss_api.model.Evento;
import com.eventuss.eventuss_api.model.Categoria;
import com.eventuss.eventuss_api.service.EventoService;
import com.eventuss.eventuss_api.repository.CategoriaRepository;
import com.eventuss.eventuss_api.repository.InscripcionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/eventos")
public class EventoController {

    private final EventoService eventoService;
    private final CategoriaRepository categoriaRepository;
    private final InscripcionRepository inscripcionRepository;

    public EventoController(EventoService eventoService,
                            CategoriaRepository categoriaRepository,
                            InscripcionRepository inscripcionRepository) {
        this.eventoService = eventoService;
        this.categoriaRepository = categoriaRepository;
        this.inscripcionRepository = inscripcionRepository;
    }

    @GetMapping
    public List<Evento> listarEventos() {
        return eventoService.obtenerEventos();
    }

    @GetMapping("/{id}")
    public Optional<Evento> obtenerEvento(@PathVariable Integer id) {
        return eventoService.obtenerEventoPorId(id);
    }

    @PostMapping
    public ResponseEntity<?> crearEvento(@RequestBody Map<String, Object> body) {
        Evento evento = new Evento();
        evento.setNombre((String) body.get("nombre"));
        evento.setDescripcion((String) body.get("descripcion"));
        evento.setFecha((String) body.get("fecha"));
        evento.setUbicacion((String) body.get("ubicacion"));
        evento.setImagenUrl((String) body.get("imagenUrl"));

        Object catObj = body.get("categoria");
        if (catObj instanceof Map) {
            Object idCat = ((Map<?, ?>) catObj).get("idCategoria");
            if (idCat != null && !idCat.toString().isEmpty()) {
                categoriaRepository.findById(Integer.parseInt(idCat.toString()))
                        .ifPresent(evento::setCategoria);
            }
        }

        return ResponseEntity.ok(eventoService.guardarEvento(evento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarEvento(@PathVariable Integer id,
                                              @RequestBody Map<String, Object> body) {
        Optional<Evento> existente = eventoService.obtenerEventoPorId(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Evento evento = existente.get();
        evento.setNombre((String) body.get("nombre"));
        evento.setDescripcion((String) body.get("descripcion"));
        evento.setFecha((String) body.get("fecha"));
        evento.setUbicacion((String) body.get("ubicacion"));
        evento.setImagenUrl((String) body.get("imagenUrl"));

        Object catObj = body.get("categoria");
        if (catObj instanceof Map) {
            Object idCat = ((Map<?, ?>) catObj).get("idCategoria");
            if (idCat != null && !idCat.toString().isEmpty()) {
                categoriaRepository.findById(Integer.parseInt(idCat.toString()))
                        .ifPresent(evento::setCategoria);
            } else {
                evento.setCategoria(null);
            }
        }

        return ResponseEntity.ok(eventoService.guardarEvento(evento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarEvento(@PathVariable Integer id) {
        try {
            inscripcionRepository.findByEvento_IdEvento(id)
                    .forEach(i -> inscripcionRepository.deleteById(i.getIdInscripcion()));
            eventoService.eliminarEvento(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar el evento");
        }
    }
}