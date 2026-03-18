package com.eventuss.eventuss_api.controller;

import com.eventuss.eventuss_api.model.Inscripcion;
import com.eventuss.eventuss_api.service.InscripcionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inscripciones")
public class InscripcionController {

    private final InscripcionService inscripcionService;

    public InscripcionController(InscripcionService inscripcionService) {
        this.inscripcionService = inscripcionService;
    }

    // LISTAR TODAS LAS INSCRIPCIONES
    @GetMapping
    public List<Inscripcion> listar() {
        return inscripcionService.listarInscripciones();
    }

    // OBTENER INSCRIPCION POR ID
    @GetMapping("/{id}")
    public Optional<Inscripcion> obtenerPorId(@PathVariable Integer id) {
        return inscripcionService.obtenerInscripcionPorId(id);
    }

    // CREAR INSCRIPCION
    @PostMapping
    public Inscripcion crear(@RequestBody Inscripcion inscripcion) {
        return inscripcionService.guardarInscripcion(inscripcion);
    }

    // ACTUALIZAR INSCRIPCION
    @PutMapping("/{id}")
    public Inscripcion actualizar(@PathVariable Integer id, @RequestBody Inscripcion inscripcion) {
        return inscripcionService.actualizarInscripcion(id, inscripcion);
    }

    // ELIMINAR INSCRIPCION
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        inscripcionService.eliminarInscripcion(id);
    }
}
