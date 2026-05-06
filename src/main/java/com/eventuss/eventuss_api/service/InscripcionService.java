package com.eventuss.eventuss_api.service;

import com.eventuss.eventuss_api.model.Inscripcion;
import com.eventuss.eventuss_api.model.Usuario;
import com.eventuss.eventuss_api.model.Evento;
import com.eventuss.eventuss_api.repository.InscripcionRepository;
import com.eventuss.eventuss_api.repository.UsuarioRepository;
import com.eventuss.eventuss_api.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;
    private final UsuarioRepository usuarioRepository;
    private final EventoRepository eventoRepository;

    public InscripcionService(InscripcionRepository inscripcionRepository,
                              UsuarioRepository usuarioRepository,
                              EventoRepository eventoRepository) {
        this.inscripcionRepository = inscripcionRepository;
        this.usuarioRepository = usuarioRepository;
        this.eventoRepository = eventoRepository;
    }

    public List<Inscripcion> listarInscripciones() {
        return inscripcionRepository.findAll();
    }

    public Optional<Inscripcion> obtenerInscripcionPorId(Integer id) {
        return inscripcionRepository.findById(id);
    }

    public List<Inscripcion> obtenerPorUsuario(Integer idUsuario) {
        return inscripcionRepository.findByUsuario_IdUsuario(idUsuario);
    }

    public boolean estaInscrito(Integer idUsuario, Integer idEvento) {
        return inscripcionRepository.existsByUsuario_IdUsuarioAndEvento_IdEvento(idUsuario, idEvento);
    }

    public Inscripcion inscribir(Integer idUsuario, Integer idEvento) {
        if (inscripcionRepository.existsByUsuario_IdUsuarioAndEvento_IdEvento(idUsuario, idEvento)) {
            throw new RuntimeException("El usuario ya está inscrito en este evento");
        }

        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Evento evento = eventoRepository.findById(idEvento)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setUsuario(usuario);
        inscripcion.setEvento(evento);

        return inscripcionRepository.save(inscripcion);
    }

    public void eliminarInscripcion(Integer id) {
        inscripcionRepository.deleteById(id);
    }
}