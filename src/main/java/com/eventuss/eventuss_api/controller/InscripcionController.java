package com.eventuss.eventuss_api.controller;

import com.eventuss.eventuss_api.model.Inscripcion;
import com.eventuss.eventuss_api.service.InscripcionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/inscripciones")
public class InscripcionController {

    private final InscripcionService inscripcionService;

    public InscripcionController(InscripcionService inscripcionService) {
        this.inscripcionService = inscripcionService;
    }

    @GetMapping
    public List<Inscripcion> listar() {
        return inscripcionService.listarInscripciones();
    }

    @GetMapping("/{id}")
    public Optional<Inscripcion> obtenerPorId(@PathVariable Integer id) {
        return inscripcionService.obtenerInscripcionPorId(id);
    }

    // Inscripciones de un usuario específico
    @GetMapping("/usuario/{idUsuario}")
    public List<Inscripcion> obtenerPorUsuario(@PathVariable Integer idUsuario) {
        return inscripcionService.obtenerPorUsuario(idUsuario);
    }

    // Verificar si un usuario ya está inscrito en un evento
    @GetMapping("/verificar")
    public ResponseEntity<Map<String, Boolean>> verificar(
            @RequestParam Integer idUsuario,
            @RequestParam Integer idEvento) {
        boolean inscrito = inscripcionService.estaInscrito(idUsuario, idEvento);
        return ResponseEntity.ok(Map.of("inscrito", inscrito));
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Map<String, Integer> body) {
        try {
            Inscripcion inscripcion = inscripcionService.inscribir(
                    body.get("idUsuario"),
                    body.get("idEvento")
            );
            return ResponseEntity.ok(inscripcion);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        inscripcionService.eliminarInscripcion(id);
    }
}
