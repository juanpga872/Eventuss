package com.eventuss.eventuss_api.service;

import com.eventuss.eventuss_api.model.Inscripcion;
import com.eventuss.eventuss_api.repository.InscripcionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;

    public InscripcionService(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    // LISTAR TODAS LAS INSCRIPCIONES
    public List<Inscripcion> listarInscripciones() {
        return inscripcionRepository.findAll();
    }

    // BUSCAR INSCRIPCION POR ID
    public Optional<Inscripcion> obtenerInscripcionPorId(Integer id) {
        return inscripcionRepository.findById(id);
    }

    // CREAR INSCRIPCION
    public Inscripcion guardarInscripcion(Inscripcion inscripcion) {

        Integer idUsuario = inscripcion.getUsuario().getIdUsuario();
        Integer idEvento = inscripcion.getEvento().getIdEvento();

        boolean yaExiste = inscripcionRepository
                .existsByUsuario_IdUsuarioAndEvento_IdEvento(idUsuario, idEvento);

        if (yaExiste) {
            throw new RuntimeException("El usuario ya está inscrito en este evento");
        }

        return inscripcionRepository.save(inscripcion);
    }

    // ACTUALIZAR INSCRIPCION
    public Inscripcion actualizarInscripcion(Integer id, Inscripcion nuevaInscripcion) {

        Optional<Inscripcion> inscripcionExistente = inscripcionRepository.findById(id);

        if (inscripcionExistente.isPresent()) {

            Inscripcion inscripcion = inscripcionExistente.get();

            inscripcion.setUsuario(nuevaInscripcion.getUsuario());
            inscripcion.setEvento(nuevaInscripcion.getEvento());

            return inscripcionRepository.save(inscripcion);
        }

        throw new RuntimeException("Inscripción no encontrada");
    }

    // ELIMINAR INSCRIPCION
    public void eliminarInscripcion(Integer id) {
        inscripcionRepository.deleteById(id);
    }
}