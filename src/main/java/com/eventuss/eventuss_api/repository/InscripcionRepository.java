package com.eventuss.eventuss_api.repository;

import com.eventuss.eventuss_api.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Integer> {

    boolean existsByUsuario_IdUsuarioAndEvento_IdEvento(Integer idUsuario, Integer idEvento);

    List<Inscripcion> findByUsuario_IdUsuario(Integer idUsuario);

    List<Inscripcion> findByEvento_IdEvento(Integer idEvento);

    Optional<Inscripcion> findByUsuario_IdUsuarioAndEvento_IdEvento(Integer idUsuario, Integer idEvento);
}